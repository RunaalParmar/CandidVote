const express = require('express');
const {model} = require('mongoose');
const {Event} = require('../models/events');
const {Candidate} = require('../models/candidates');
const router = express.Router();

router.post('/saveEvent', (req, res, next) => {
  // Generate and store the event ID for this newly created event.
  const eid = ""; // TODO

  // Array to hold the Candidate IDs that will be generated.
  const cids = [];

  console.log(req); // TODO: this is for testing, remove later.

  // Extract the candidates data from the received event object.
  for(const candidate of req.candidates) {
    const cid = ""; // TODO

    // Create new candidate item.
    const newCandidate = new Candidate({
      cid,
      email: newCandidate.email,
      fullName: newCandidate.fullName,
      affiliation: newCandidate.affiliation,
      platform: newCandidate.platform,
    });

    newCandidate.save(); // TODO: What else do I do here?

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
    description: req.body.description,
    candidateIDs: cids,
  });

  newEvent.save()
    .then((user) => {
      console.log(user);
    next();
  });
}, passport.authenticate('local', {
    failureRedirect: '/login-failure'
}), (req, res)=>{
    if(req.user) {
      let url = "";

    if(req.user.authLevel == "admin" || req.user.authLevel == "superAdmin") {
      url = '/adminDashboard/dashboard_admin.html';
    } else {
      url = '/voterDashboard/dashboard_voter.html';
    }

    res.status(200).send({
      "uid": req.user.uid,
      url
    });
  }
});

module.exports = router;