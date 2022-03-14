function myFunction(){
  console.log("hello")
  vote_display.style ="display : block"
}

(function(){
  const vote_container = document.getElementById('vote_container');
  const event_one = document.getElementById('vote--1');
  const vote_display = document.getElementById('vote_display')
  const result = {
    eventName:"",
    candidate:""
  }
  const results  = [];
  const candidates = [
          {
            name : "Christopher",
            descriptiion : "Canadian Nationalist Party",
            id : "christopher@gmail.com"
          },
          
          {
            name : "Christopher",
            descriptiion : "Canadian Nationalist Party",
            id : "christopher@gmail.com"
          }
  ]

  function addCandidate(){
   const candidate_name = document.createElement('div');
   const candidate_description = document.createElement('div');
   const candidate_box = document.createElement('div');
   const vote_btn = document.createElement('button');
   const vote_card = document.createElement('div');
   const column = document.createElement('div');
   
   candidate_name.classList.add('vote__candidate-name');
   candidate_name.innerHTML = "Chirstopher";
   
   candidate_description.classList.add('vote__candidate-description')
   candidate_description.innerHTML = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores nesciunt saepe, "
   
   candidate_box.classList.add('vote__candidate_box');
   candidate_box.appendChild(candidate_name)
   candidate_box.appendChild(candidate_description)
   
   vote_btn.classList.add('vote_btn');
   vote_btn.innerHTML = "vote";
   
   vote_card.classList.add('vote__card')
   vote_card.appendChild(candidate_box)
   vote_card.appendChild(vote_btn)
   
   column.classList.add('vote__col-1-4')
   column.appendChild(vote_card)
   
   return column;
  }
  
  // event_one.addEventListener('change' , function(){
  //   if(this.checked){
  //     vote_container.style = 'display : none';
      
  //     // vote_container.appendChild(addCandidate())
  //   }else{
  //     console.log("The button is not checked")
  //   }
  // } )
  
})()

