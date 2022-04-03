const supertest = require("supertest");
const express = require('express');
const {model} = require('mongoose');
const mongoose = require("mongoose");
const {Event} = require('../models/events');
const {Candidate} = require('../models/candidates');
const createServer = require("../servers/user_server");

const port = 5000;

const localhost_addr = "http://localhost:";

describe("Checking create event", () => {


beforeEach(() => {

    const app = createServer()
	mongoose.connect(
		"mongodb://localhost:27017/candidVote",
		{ useNewUrlParser: true }
	)
})

  
test("To get saved event: GET /saveEvent", async () => {

    const newEvent = {
        candidates: [
          {
            Name: 'Jhon',
            Email: 'Jhon@gmail.com',
            Affiliation: 'testParty',
            Platform: 'test'
          },
          {
            Name: 'Gwen',
            Email: 'Gwen@gmail.com',
            Affiliation: 'testParty2',
            Platform: 'test2'
          }
        ],
        eventName: 'testEventName',
        votersTag: 'testEventTag',
        startDate: '2022-04-28',
        endDate: '2022-05-07',
        eventDescription: 'testEventDesc'
      };

fetch(local_addr + '/events/saveEvent', {
    method:'POST',
    headers:{
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body:JSON.stringify(newEvent)  
  })

  .then(response => {
    if(response.status === 200) {
      window.location.replace(response.url);
    }
    return response.json();
  })

  .then(data => {
    console.log(data);
    candidates.innerHTML ="";
  })
  
  .catch((error) => {
    console.error('Error:' , error);
  })

  const eventdata = await Event.findOne({eventName: 'testEventName'});

  expect(eventdata).toEqual(newEvent); 
})


})