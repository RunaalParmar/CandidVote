const express = require('express');
const {model} = require('mongoose');
const {User} = require('../models/users');
const {Event} = require('../models/events');
const {Candidate} = require('../models/candidates');
const router = express.Router();

router.post('/loadEventsForUser', async (req, res, next) => {
  const uid = req.uid;

  for(const candidate of req.body.candidates) {

    // Create new candidate item.
    const newCandidate = new Candidate({
      cid,
      email: candidate.Email,
      fullName: candidate.Name,
      affiliation: candidate.Affiliation,
      platform: candidate.Platform,
    });

    await newCandidate.save();

    // Add new candidate ID to the list of IDs.
    cids.push(cid);
  }

  // Create new event item.
  const newEvent = new Event({
    eid,
    eventName: req.body.eventName,
    votersTag: req.body.votersTag,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    description: req.body.eventDescription,
    candidateIDs: cids,
  });

  await newEvent.save()
    .then((user) => {
      console.log(user);
    next();
  });

  res.redirect('/adminDashboard/dashboard_admin.html');
});

module.exports = router;