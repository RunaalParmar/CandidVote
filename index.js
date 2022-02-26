const express = require("express")
const mongoose = require("mongoose")
const createServer = require("./servers/user_server") 

mongoose
	.connect("mongodb://localhost:27017/CandidVote", { useNewUrlParser: true })
	.then(() => {
		const app = createServer() 
		app.listen(5000, () => {
			console.log("Server has started!")
		})
	})