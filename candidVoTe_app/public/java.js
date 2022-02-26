const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');

const realSignUpButton = document.getElementById('signUp');
const signUpForm = document.getElementById('signUpForm');
const realSignInButton = document.getElementById('signIn');
const signInForm = document.getElementById('signInForm');

const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});


signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = {};

    for (const child of signUpForm.querySelectorAll('.signUpFields')) {
        formData[child.id] = child.value;
    }

    console.log(JSON.stringify(formData)) // test

    console.log(formData)

    fetch('http://localhost:5000/users/signUp', {
        method: 'POST',
        headers: {
        	'Accept': 'application/json',
        	'Content-Type': 'application/json'
    	},
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('New User Info', data)
        })
        .catch((error) => {
            console.error('Error:', error)
        })
});

signInForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const signInEmail = document.getElementById('signInEmail').value;
    const signInPassword = document.getElementById('signInPassword').value;

    const formData = {email: signInEmail, password: signInPassword}

    console.log(JSON.stringify(formData)) // test

    console.log(formData)

    fetch('http://localhost:5000/users/signIn', {
        method: 'POST',
        headers: {
        	'Accept': 'application/json',
        	'Content-Type': 'application/json'
    	},
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('New User Info', data)
        })
        .catch((error) => {
            console.error('Error:', error)
        })
});