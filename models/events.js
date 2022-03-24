// Basic schema definition for the events collection in the database.

const mongoose = require('mongoose');

// Schema object to define all attributes and related propreties.
const eventModel = new mongoose.Schema({
    eid: {
        type: String,
        required: true,
    },
    eventName: {
        type: String,
        required: true,
    },
    votersTag: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    candidateIDs: [{ // An array of strings representing candidate IDs.
        type: String,
        required: true,
    }]
});

// This model connects the collection and the schema.
// If the collection has not yet been created, this will create one.
module.exports = {
    Event: mongoose.model('events', eventModel)
};