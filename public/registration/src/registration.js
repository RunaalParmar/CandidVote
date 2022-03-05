const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');

const signUpForm = document.getElementById('signUpForm');
const signInForm = document.getElementById('signInForm');

const container = document.getElementById('container');

const localhost_addr = 'http://localhost:5000';

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
        // formData[child.id] = child.value;
        sessionStorage.setItem(child.id, child.value)
    }

    window.location.replace("../../registration/registration.html");

    // fetch(localhost_addr + '/users/signUp', {
    //     method: 'POST',
    //     headers: {
    //     	'Accept': 'application/json',
    //     	'Content-Type': 'application/json'
    // 	},
    //     body: JSON.stringify(formData)
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log('New User Info', data);
    //         if(response.status === 403) {
    //             document.getElementById('errorMessage').innerHTML = data.msg;
    //         }
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     })

});


(function() {
  
  // const resgisterButton = document.getElementById('registerButton')
  const registerForm = document.getElementById('registerForm')
  
  const localhost_addr = 'http://localhost:5000';
  const formData = {};
  for(const click of registerForm.querySelectorAll('.registerField'))
    {
      formData[click.id] = click.value;
    }
  registerForm.addEventListener('submit' , (event) =>{
    event.preventDefault()
    
    fetch(localhost_addr + '/users/registers', {
      method:'POST',
      
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      
      body:JSON.stringify(formData)
      
    }).then(response =>{ response.json()})
      .then(data =>{console.log('New User Info' , data)})
      .catch((error) => {console.error('Error' , error)})
    
  })
  
})()