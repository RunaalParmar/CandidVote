(function (params) {
    const addEvent = document.getElementById('voteNow')
    
    addEvent.addEventListener('click', ()=>{
        window.location.replace("../vote/vote.html")
    })
})()