(function (params) {
    const addEvent = document.getElementById('addEvent')
    
    addEvent.addEventListener('click', ()=>{
        window.location.replace("../createEvent/createEvent.html")
    })
});

const viewEvent = document.getElementById('viewEvent')
const viewResults = document.getElementById('viewResult')
const logOut = document.getElementById('logOut')

viewEvent.addEventListener('click', () => {
	window.location.replace("../createEvent/createEvent.html") //change the html linking to view events page
});

viewResults.addEventListener('click', () => {
	window.location.replace("../createEvent/createEvent.html") //change the html linking to view results page
});

logOut.addEventListener('click', () => {
	window.location.replace("../createEvent/createEvent.html") //change the html linking to go back to sign in/ sign up page
});