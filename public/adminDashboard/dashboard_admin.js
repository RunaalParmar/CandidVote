(function() {
    // Linking to the create events page.
    const addEvent = document.getElementById('addEvent');
    addEvent.addEventListener('click', ()=>{
        window.location.replace("../createEvent/createEvent.html");
    })
    
    // Linking to view/close events page.
    const viewEvent = document.getElementById('viewEvent');
    viewEvent.addEventListener('click', () => {
	    window.location.replace("../closeEvent/closeEvent.html");
    });

    // Linking to the view results page.
    const viewResults = document.getElementById('viewResults');
    viewResults.addEventListener('click', () => {
    	window.location.replace(""); // TODO: change the html linking to view results page
    });

    // Delete session storage and stored cookie and return to the sign in/up page.
    const logOut = document.getElementById('logout');
    logOut.addEventListener('click', () => {
        // Clear session storage.
        sessionStorage.clear();

        // Delete residual cookies. // TODO: Fix deletion of cookie.
        document.cookie.split(";").forEach(function(c) {
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });

        // Redirect to sign in/up page.
    	window.location.replace("../signInSignUp/signInSignUp.html");
    });
})();