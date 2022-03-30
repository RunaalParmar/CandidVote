(function (params) {
    const addEvent = document.getElementById('voteNow')
    const  logout =   document.getElementById('out')
    addEvent.addEventListener('click', ()=>{
        window.location.replace("../vote/vote.html")
    })
    
    logout.addEventListener('click', ()=>{
        window.location.replace("../signInSignUp/signInSignUp.html")
    })
})()