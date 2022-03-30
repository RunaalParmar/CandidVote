const express = require('express');
const {model} = require('mongoose');
const {User} = require('../models/users');
const {Event} = require('../models/events');
const {Candidate} = require('../models/candidates');
const router = express.Router();


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

  // Using the eid, retrieve the event's data and set it to be closed.
  await Event.findOneAndUpdate({eid: eid}, {isClosed: true});
  const modEvent = await Event.findOne({eid: eid});
  console.log(modEvent);

  // TODO: Blockchain magic to tally winner and vote counts for the newly closed event.

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
  
  // Using the eid, retrieve the event's data and add the uid to the voterUIDs array.
  let modEvent = await Event.findOne({eid: eid});
  await Event.findOneAndUpdate({eid: eid}, {"$push": {"voterUIDs": uid}});
  modEvent = await Event.findOne({eid: eid});
  console.log(modEvent); // TODO

  // TODO: Blockchain magic to store the vote as its cid and eid.

  res.status(200).send({msg: "Received!"});
});


module.exports = router;