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