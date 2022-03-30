(function (params) {
    const addEvent = document.getElementById('addEvent')
    const  logout =   document.getElementById('out')
    addEvent.addEventListener('click', ()=>{
        window.location.replace("../createEvent/createEvent.html")
    })
    
    logout.addEventListener('click', ()=> {
        console.log("hello")
        window.location.replace("../signInSignUp/signInSignUp.html")
    })
})()