const express = require('express');
const {model} = require('mongoose');
const {User} = require('../models/users');
const {Event} = require('../models/events');
const {Candidate} = require('../models/candidates');
const artifacts = require('../build/contracts/Vote.json');
const contract = require('@truffle/contract');
const Web3 = require('web3');
var converter = require('hex2dec');
const router = express.Router();


    if (typeof web3 !== 'undefined') {
      var web3 = new Web3(web3.currentProvider); 
  } else {
      var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
      console.log("########### web3 object created in vote route ################")
  }
  const LMS = contract(artifacts)
  LMS.setProvider(web3.currentProvider)
  


// Load the event data for all open events that a given user is eligible for.
router.get('/loadEventsForUser', async (req, res, next) => {
  const uid = req.query.uid;

  // Using uid, get the user's orgName.
  const userData = await User.findOne({uid: uid});
  const userOrgName = userData.orgName;

  // Using orgName, find all open events with same voter tag.
  const eventsForUser = await Event.find({votersTag: userOrgName, isClosed: false});

  // Send back open events as list of objects.
  res.status(200).send({eventsForUser});
});


// Load the candidate data for a given event.
router.get('/loadCandidates', async (req, res, next) => {
  const eid = req.query.eid;

  // Get event data for the given EID.
  const eventData = await Event.findOne({eid: eid});

  // Retrieve the list of cids from the event data.
  const cids = eventData.candidateIDs;
  
  // Produce an array of candidate data for the given event.
  let candDataArr = [];
  for(const cid of cids) {
    const canData = await Candidate.findOne({'cid': cid});
    candDataArr.push(canData);
  }

  res.status(200).send({candDataArr});
});


// Set the voting for an event to be closed.
router.post('/closeEvent', async (req, res, next) => {
  const eid = req.body.eid;
  const accounts = await web3.eth.getAccounts();
  const lme = await LMS.deployed();

  // Using the eid, retrieve the event's data and set it to be closed.
  await Event.findOneAndUpdate({eid: eid}, {isClosed: true});
  const modEvent = await Event.findOne({eid: eid});
  console.log(modEvent);

  // TODO: Blockchain magic to tally winner and vote counts for the newly closed event.
        const event = eid;
        let cache = [];
        const ctr = await lme.voteCount()
        console.log("vote counts: "+ ctr.toNumber())
        const ctr1 = ctr.toNumber()  

        for (let i = 1; i <= ctr1; i++) {
            const votes = await lme.tasks(i)
            console.log("#########the votes are ###########")
            const votes_temp = JSON.stringify(votes)
            const votes_json = JSON.parse(votes_temp)
            // console.log(votes_json)
            // console.log(typeof(votes_json.eventId))
            var dec_eventId = converter.hexToDec(votes_json.eventId);
            var votes_event = converter.hexToDec(votes_json.vote);
            var num = Number(votes_event)
            if(event == dec_eventId){
                if(votes_event in votes_dict){
                    console.log("111")
                    votes_dict[num] += 1;
                }
                else{
                    console.log("121")
                    votes_dict[num] = 1
                }
            }
            console.log("####################################")
            cache = [...cache, votes];
        }
        console.log(votes_dict)

  // TODO: Store data for newly closed event on mongoDB under the "results" collection.

  // Send back a status to indicate success.
  res.status(200).send({msg: "Event closed for voting. Check view results page for details."});
});


// Store the received vote on the blockchain.
router.post('/storeVote', async (req, res, next) => {
  cid = req.body.cid;
  eid = req.body.eid;
  uid = req.body.uid;

  console.log(cid);
  console.log(eid);
  console.log(uid);
  const accounts = await web3.eth.getAccounts();
  const lme = await LMS.deployed();
  
  // Using the eid, retrieve the event's data and add the uid to the voterUIDs array.
  let modEvent = await Event.findOne({eid: eid});
  await Event.findOneAndUpdate({eid: eid}, {"$push": {"voterUIDs": uid}});
  modEvent = await Event.findOne({eid: eid});
  console.log(modEvent); // TODO

  // TODO: Blockchain magic to store the vote as its cid and eid.
  const eventID = eid;
        const voteID = cid;
        const ctr = await lme.voteCount()
        console.log("vote counts: "+ ctr.toNumber())
        const ctr1 = ctr.toNumber()
        const cast = await lme.createVote(eventID , voteID, {from: accounts[0]} )
        console.log(cast)

  res.status(200).send({msg: "Received!"});
});


module.exports = router;