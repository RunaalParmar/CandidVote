(function(){
   const candidateForm = document.getElementById('candidateForm')
   const candidateName = document.getElementById('candidateName');
   const candidateEmail = document.getElementById('candidateEmail');
   const candidateParty =document.getElementById('candidateParty');
   const candidateDescripttion = document.getElementById('candidateDescripttion');
   const candidates = document.getElementById('candidates')
   const eventForm = document.getElementById('eventForm')
  //  let val  = 0;
   const local_addr = 'http://localhost:5000'
   
   function addCandidate(){
      let name = document.createElement('div');
      name.classList.add('main_div')
      let delete_btn = document.createElement('button')
      delete_btn.innerHTML ="delete"
      delete_btn.setAttribute('id', 'delete_btn')
      delete_btn.setAttribute("type", "button")
      delete_btn.setAttribute("onclick" , "this.parentElement.remove()")
      delete_btn.classList.add('delete_b')
      let holderOne = document.createElement('div')
      holderOne.classList.add('holder')
      
      
      let lableOne = document.createElement('span')
      lableOne.innerHTML = 'Name'
      lableOne.classList.add('on_touch')
      
  
      let inputBox1 = document.createElement('input')
      inputBox1.setAttribute("type", "text");
      inputBox1.value = candidateName.value
      
      // inputBox1.classList.add('eventField')
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
      
      // inputBox2.classList.add('eventField')
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
      
      // inputBox3.classList.add('eventField')
      inputBox3.classList.add('box')
      
      holderThree.appendChild(lableThree)
      holderThree.appendChild(inputBox3)
      
      
      
      
     
      let holderFour = document.createElement('div')
      holderFour.classList.add('holder')
      
      let lableFour = document.createElement('span')
      lableFour.innerHTML = 'Platform'
      lableThree.classList.add('on_touch')
      
  
      let inputBox4 = document.createElement('textarea')
      inputBox4.value = candidateDescripttion.value
      
      // inputBox4.classList.add('eventField')
      inputBox4.classList.add('box1')
      
      holderFour.appendChild(lableFour)
      holderFour.appendChild(inputBox4)

      
      name.appendChild(delete_btn)
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
   

    
    eventForm.addEventListener('submit' , (event) => {
      
      event.preventDefault();
      const formData = {candidates:[]}
    
      for(const child of eventForm.querySelectorAll('.eventField'))
      {
        formData[child.id] = child.value.trim();
      }
      
      
      for(const child of eventForm.querySelectorAll('.main_div')){
        const candidate = {}
        for(const baby of child.childNodes){
          if( baby.innerText === 'delete') continue
          candidate[baby.innerText] = baby.lastChild?.value.trim()
        }
        formData.candidates.push(candidate)
      }
      
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