(function(){
   const candidateForm = document.getElementById('candidateForm')
   const candidateName = document.getElementById('candidateName');
   const candidateEmail = document.getElementById('candidateEmail');
   const candidateParty =document.getElementById('candidateParty');
   const candidateDescripttion = document.getElementById('candidateDescripttion');
   const candidates = document.getElementById('candidates')
   const eventForm = document.getElementById('eventForm')
   
   const local_addr = 'http://localhost:5000'
   
   function addCandidate(){
      let name = document.createElement('div');
      name.classList.add('main_div')
      
      let holderOne = document.createElement('div')
      holderOne.classList.add('holder')
      
      
      let lableOne = document.createElement('span')
      lableOne.innerHTML = 'Full Name'
      lableOne.classList.add('on_touch')
      
  
      let inputBox1 = document.createElement('input')
      inputBox1.setAttribute("type", "text");
      inputBox1.value = candidateName.value
      inputBox1.disabled = true;
      inputBox1.classList.add('eventField')
      inputBox1.classList.add('box')
      
      holderOne.appendChild(lableOne)
      holderOne.appendChild(inputBox1)
      
      
      

      
      let holderTwo = document.createElement('div')
      holderTwo.classList.add('holder')
      
      let lableTwo = document.createElement('span')
      lableTwo.innerHTML = 'Email'
      lableTwo.classList.add('on_touch')
      
  
      let inputBox2 = document.createElement('input')
      inputBox2.setAttribute("type", "email");
      inputBox2.value = candidateEmail.value
      inputBox2.disabled = true;
      inputBox2.classList.add('eventField')
      inputBox2.classList.add('box')
      
      holderTwo.appendChild(lableTwo)
      holderTwo.appendChild(inputBox2)
      
      

      
      let holderThree = document.createElement('div')
      holderThree.classList.add('holder')
      
      let lableThree = document.createElement('span')
      lableThree.innerHTML = 'Affilation'
      lableThree.classList.add('on_touch')
      
  
      let inputBox3 = document.createElement('input')
      inputBox3.setAttribute("type", "text");
      inputBox3.value = candidateParty.value
      inputBox3.disabled = true;
      inputBox3.classList.add('eventField')
      inputBox3.classList.add('box')
      
      holderThree.appendChild(lableThree)
      holderThree.appendChild(inputBox3)
      
      
      
      
     
      let holderFour = document.createElement('div')
      holderFour.classList.add('holder')
      
      let lableFour = document.createElement('span')
      lableFour.innerHTML = 'Candidate Manifesto'
      lableThree.classList.add('on_touch')
      
  
      let inputBox4 = document.createElement('textarea')
      inputBox4.value = candidateDescripttion.value
      inputBox4.disabled = true;
      inputBox4.classList.add('eventField')
      inputBox4.classList.add('box1')
      
      holderFour.appendChild(lableFour)
      holderFour.appendChild(inputBox4)

      
      
      name.appendChild(holderOne)
      name.appendChild(holderTwo)
      name.appendChild(holderThree)
      name.appendChild(holderFour)
      
      
      
      
      
      return name
      
      
      
      
    
   }
   
   
   
     candidateForm.addEventListener('submit' , (event) =>{
     event.preventDefault()
     candidates.style.marginTop = '2rem'
     candidates.appendChild(addCandidate())
     document.getElementById('add').checked = false;
   })
   
    const formData = {}
    
    for(const child of eventForm.querySelectorAll('.eventField'))
    {
      formData[child.id] = child.value;
    }
    
    eventForm.addEventListener('submit' , (event) => {
      
      event.preventDefault();
      
      fetch(local_addr + '/user/event' ,{
        
        method:'POST',
        headers:{
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body:JSON.stringify(formData)
        
      }).then(response => {
        response.json()
      }).then(data => {
        console.log(data)
        candidates,innerHTML ="";
      }).catch((error) => {
        console.error('Error' , error)
      })
      
      
    })
     
  
  
  
  
  
  
  
  
})()