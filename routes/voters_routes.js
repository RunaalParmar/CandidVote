
//const { restart } = require('nodemon');
const shortid = require('short-id')
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

    app.get('/getData' , async(req,res)=>{
         
        
        //get data from the blockchain
        let cache = [];
        const ctr = await lme.voteCount()
        console.log("vote counts: "+ ctr.toNumber())
        const ctr1 = ctr.toNumber()
        //res.send("<h1>hi - getData</h1>")  

            for (let i = 1; i <= ctr1; i++) {
                const votes = await lme.tasks(i)
                console.log("#########the votes are ###########")
                console.log(votes)
                console.log("####################################")
                 cache = [...cache, votes];
            }
        // const votes = await lme.tasks(1)
        console.log("votes : "+  JSON.stringify(cache))
        
        res.json(cache);
  });
    
}

module.exports = routes;