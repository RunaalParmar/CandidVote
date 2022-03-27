
//const { restart } = require('nodemon');
const shortid = require('short-id')
var converter = require('hex2dec');
function routes(app, dbe , accounts, lme){

    app.get('/' ,(req , res) =>{
        res.send("<h1>hi</h1>")
    })
    app.get('/putData' ,async (req,res)=>{
        //do something to put the data into blockchain 
        // const eventID = req.body.eventID;
        // const votes = req.body.voteID;
        const eventID = 1234;
        const voteID = 334;
        const ctr = await lme.voteCount()
        console.log("vote counts: "+ ctr.toNumber())
        const ctr1 = ctr.toNumber()
        const cast = await lme.createVote(eventID , voteID, {from: accounts[0]} )
        console.log(cast)
        res.send("<h1>success</h1>")


    })

    app.get('/getData/:event' , async(req,res)=>{
         
        const prms = req.params;
        const event = prms.event;
        //const event = 1234
        console.log(event);
        votes_dict = {};
        //get data from the blockchain
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
        
        
        res.json(cache);
  });
    
}

module.exports = routes;