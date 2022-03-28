const express = require('express');
const {model} = require('mongoose');
const {User} = require('../models/users');
const {Event} = require('../models/events');
const {Candidate} = require('../models/candidates');
const router = express.Router();


// Load the event data for all events that a given user is eligible for.
router.get('/loadEventsForUser', async (req, res, next) => {
  const uid = req.query.uid;

  // Using uid, get the user's orgName.
  const userData = await User.findOne({uid: uid});
  const userOrgName = userData.orgName;

  // Using orgName, find all events with same voter tag.
  const eventsForUser = await Event.find({voterTag: "test2org"}); // TODO: this is bugged, it returns all events, not just where voterTag == orgName

  console.log(eventsForUser);

  // send back events as list of objects.
  res.status(200).send({eventsForUser});
});


// Load the candidate data for a given event.
router.get('/loadCandidates', async (req, res, next) => {
  const eid = req.query.eid;

  // Get event data for the given ID.
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


// Store the received vote on the blockchain.
router.post('/storeVote', async (req, res, next) => {
  res.status(200).send();
});


module.exports = router;