//require('dotenv').config();
const express= require('express')
const app =express()
const routes = require('./routes/voters_routes')
const Web3 = require('web3');
const mongodb = require('mongodb').MongoClient
const mongoose = require('mongoose')
const artifacts = require('./build/contracts/Vote.json');
const contract = require('@truffle/contract');
const cors = require('cors');
const { route } = require('express/lib/application');

app.use(cors());
app.use(express.json());

if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider); 
} else {
    var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
    console.log("########### web3 object created ################")
}

const LMS = contract(artifacts)
//console.log(LMS)
LMS.setProvider(web3.currentProvider)
mongodb.connect("mongodb://localhost:27017/sampleDatabase",{ useUnifiedTopology: true } , async (err ,client) =>{

    const db =client.db('Cluster0')

    //const accounts = await web3.eth.getAccounts();
    //const account = '0x1929e73052628f3c6E4E781f30af1FcfE308815c';
    const accounts = await web3.eth.getAccounts();
    //const contactList = new web3.eth.Contract(CONTACT_ABI.CONTACT_ABI, CONTACT_ADDRESS.CONTACT_ADDRESS);
    const lms = await LMS.deployed();
    routes(app, db, accounts, lms);
    app.listen(process.env.PORT || 8082, () => {
        console.log('listening on port '+ (8082));
        //console.log(accounts)
     })

})
   
        //const db =client.db('sampleDatabase')
        // const accounts1 =  async() =>{
        //     return await web3.eth.getAccounts();
        // }
        // const accounts = accounts1()
        // const lms1 =  async() =>{
        //     return await LMS.deployed();
        // }
        // const lms = lms1()
            //const lms = LMS.at(contract_address) for remote nodes deployed on ropsten or rinkeby
    //routes(app,db = 'none', lms, accounts)
    

    