(function (params) {
    // Linking to the create events page.
    const addEvent = document.getElementById('addEvent')
    addEvent.addEventListener('click', ()=>{
        window.location.replace("../createEvent/createEvent.html")
    })
    
    // Linking to view events page.
    const viewEvent = document.getElementById('viewEvent')
    viewEvent.addEventListener('click', () => {
	    window.location.replace("../closeEvent/closeEvent.html")
    });

    const viewResults = document.getElementById('viewResult')
    viewResults.addEventListener('click', () => {
    	window.location.replace("") // TODO: change the html linking to view results page
    });

    // Delete session storage and stored cookie and return to the sign in/up page.
    const logOut = document.getElementById('logOut')
    logOut.addEventListener('click', () => {
        // Clear session storage.
        sessionStorage.clear();

        // Delete residual cookies.
        document.cookie.split(";").forEach(function(c) {
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });

        // Redirect to sign in/up page.
    	window.location.replace("../signInSignUp/signInSignUp.html")
    });
});