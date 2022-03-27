(function(){
  const event_container = document.getElementById('event_container');
  const vote_container = document.getElementById('vote_container');
  const event_one = document.getElementById('event_one');
  const vote_display = document.getElementById('vote_display')
  const exist_vote = document.getElementById('exist_vote')
  const loader_container = document.getElementById('loader_container')
  const can_box = document.getElementById('can_box')
  const vote__message = document.getElementById('vote__message')
  const graphics_containerID = document.getElementById('graphics_containerID')
  const localhost_addr = 'http://localhost:5000';
  
  const results  = [];
  
  function addEvent(eid, eventName, startDate , endDate, mesg_id){
    const name = document.createElement('div');
    const DateLabelOne = document.createElement('label');
    const DateLabelTwo = document.createElement('label');
    const DateValueOne = document.createElement('span');
    const DateValueTwo = document.createElement('span');
    const DateItemOne = document.createElement('div');
    const DateItemTwo = document.createElement('div');
    const button = document.createElement('button');
    const description = document.createElement('div');
    const endedVote = document.createElement('div');
    const box = document.createElement('div');
    const details = document.createElement('div');
    const card = document.createElement('div');
    const column = document.createElement('div');
    
    
    name.classList.add('card__event-name');
    name.innerHTML = eventName;
    
    description.classList.add('card__event-description');
    
    DateLabelOne.classList.add('card__date-label');
    DateLabelOne.innerHTML = "Start Date";
    
    DateValueOne.classList.add('card__date_value');
    DateValueOne.innerHTML = startDate;
    
    DateItemOne.classList.add('card__date_item');
    DateItemOne.appendChild(DateLabelOne);
    DateItemOne.appendChild(DateValueOne);
    description.appendChild(DateItemOne);
    
    
    DateLabelTwo.classList.add('card__date-label')
    DateLabelTwo.innerHTML = "End Date";
    
    DateValueTwo.classList.add('card__date_value');
    DateValueTwo.innerHTML = endDate;
    
    DateItemTwo.classList.add('card__date_item');
    DateItemTwo.appendChild(DateLabelTwo);
    DateItemTwo.appendChild(DateValueTwo);
    description.appendChild(DateItemTwo);
    
  
    button.classList.add('card__vote_btn');
    button.setAttribute('id' , `${eid}`);
    button.setAttribute('onclick' , `sessionStorage.setItem('eid', this.id);
                                    let loader_container = document.getElementById('loader_container');
                                    loader_container.style = 'display :block'; const closed_event_message = document.getElementById('${mesg_id.toString()}');
                                    closed_event_message.innerHTML = 'Your vote has been collected for this event, you can no longer vote';
                                    this.disabled = true`)
    button.setAttribute('type' , 'button');
    button.innerHTML = "Start";
    
    endedVote.classList.add('card__btn_disabled');
    endedVote.setAttribute('id' , `${mesg_id.toString()}`);
    
    box.classList.add('card__event_box');
    box.appendChild(name);
    box.appendChild(description);
    
    details.classList.add('card__event-details');
    details.appendChild(box);
    details.appendChild(button);
    details.appendChild(endedVote);
    
    card.classList.add('card');
    card.appendChild(details);
    
    column.classList.add('col-1-3');
    column.appendChild(card);
    
    return column;
  }
  
  async function loadEvents() {
    // Get user's ID from session storage.
    const uid = window.sessionStorage.getItem('uid');

    await fetch(localhost_addr + '/vote/loadEventsForUser', {
      method:'GET',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(uid)
    })

    .then(response => {
      return response.json();
    })

    .then(data => {
      //  console.log(data);
      let mesg_id = 0;
      for (const baby of data){
        let temp = addEvent(baby.eid , baby.eventName, baby.startDate , baby.endDate, mesg_id + 1);
        event_container.append(temp);
      }
      graphics_containerID.style = 'display:none';
      event_container.style = 'display: flex';
    })
  }
  
  
  function addCandidate(name, description , id){
    const candidate_name = document.createElement('div');
    const candidate_description = document.createElement('div');
    const candidate_box = document.createElement('div');
    const vote_btn = document.createElement('button');
    const vote_card = document.createElement('div');
    const column = document.createElement('div');
    
    candidate_name.classList.add('vote__candidate-name');
    candidate_name.innerHTML = name;
    
    candidate_description.classList.add('vote__candidate-description');
    candidate_description.innerHTML = description;
    
    candidate_box.classList.add('vote__candidate_box');
    candidate_box.appendChild(candidate_name)
    candidate_box.appendChild(candidate_description)
    
    vote_btn.classList.add('vote_btn');
    vote_btn.setAttribute('id' , id)
    vote_btn.setAttribute("onclick" , ` sessionStorage.setItem('cid',  this.id);
                                        const vote_message = document.getElementById('vote__message');
                                        vote_message.innerHTML = 'You  have  Vote!' `)
    vote_btn.innerHTML = "vote";
    
    vote_card.classList.add('vote__card')
    vote_card.appendChild(candidate_box)
    vote_card.appendChild(vote_btn)
    
    column.classList.add('vote__col-1-4')
    column.appendChild(vote_card)
    
    return column;
  }
  
  
  if(exist_vote) {
    exist_vote.addEventListener('click', () => {
      vote_display.style = "display: none";
      can_box.innerHTML ='';
      vote__message.innerHTML=""
      
      const voteDetails = {
        eid : window.sessionStorage.getItem('eid'),
        cid: window.sessionStorage.getItem('cid')
      }
      
      fetch(localhost_addr + '/user/save_vote' ,{
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify(voteDetails)
      })

      .then(response => {
        return response.json()
      })

      .then(data => {
        console.log(data)
      })

      // console.log('results');
      // results.push(window.sessionStorage.getItem('vote'))
      // window.sessionStorage.clear();
      // console.log(results)
      
    })
  }

  async function loadCandidates(){
    const eventDetails = {
      ID : window.sessionStorage.getItem('userID'),
      EID : window.sessionStorage.getItem('eid')
    }
    await fetch(localhost_addr + '/user/load_candidates' ,{
      method:'GET',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(eventDetails)
    })

    .then(response => {
      return response.json()
    })

    .then(data => {
      console.log(data)
      for (const child of candidatesArray){
        let temp = addCandidate(child.name ,child.descriptiion, child.id)
        can_box.append(temp)
      }
      loader_container.style = 'display : none';
      vote_display.style ='display : block'
    })
  }


  // Used to observe the changes in  the given element with respct to the viewport or the specified root "parent element".
  function onVisible(element, callback) {
    new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.intersectionRatio > 0) {
          callback(element);
          // observer.disconnect();
        }
      });
    }).observe(element);
  }

  onVisible(loader_container, loadCandidates);

  function onMonitor(element, callback) {
    new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.intersectionRatio > 0) {
          callback(element);
          observer.disconnect();
        }
      });
    }).observe(element);
  }
 
  onMonitor(graphics_containerID, loadEvents)

})()

