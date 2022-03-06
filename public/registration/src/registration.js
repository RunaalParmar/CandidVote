const registerButton = document.getElementById('registerButton');
const registerForm = document.getElementById('registerForm');
const container = document.getElementById('container');

const localhost_addr = 'http://localhost:5000';

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const rawFormData = new FormData(registerForm);
    const formDataAdditional = Object.fromEntries(rawFormData);

    const formData = {};

    for (const child of registerForm.querySelectorAll('.registerField')) {
        formData[child.id] = child.value;
    }

    let orgName = sessionStorage.getItem("orgName");
    let username = sessionStorage.getItem("username");
    let email = sessionStorage.getItem("email");
    let password = sessionStorage.getItem("password");

    formData.orgName = orgName;
    formData.username = username;
    formData.email = email;
    formData.password = password;

    formData.gender = formDataAdditional.gender;

    console.log(formData); // TODO: Remove

    fetch(localhost_addr + '/users/register', {
        method: 'POST',
        headers: {
        	'Accept': 'application/json',
        	'Content-Type': 'application/json'
    	},
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('New User Info', data);
            if(response.status === 403) {
                document.getElementById('errorMessage').innerHTML = data.msg;
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        })

});