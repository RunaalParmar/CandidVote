(function(){
  const event_container = document.getElementById('event_container')
  const graphics_containerID = document.getElementById('graphics_containerID')``
  
  
  const result = (eventName , startDate , endDate , candidateName , candidateVotes) => {
    const name = document.createElement('div');
    const DateLabelOne = document.createElement('label');
    const DateLabelTwo = document.createElement('label');
    const DateValueOne = document.createElement('span');
    const DateValueTwo = document.createElement('span');
    const DateItemOne = document.createElement('div');
    const DateItemTwo = document.createElement('div');
    const winnersBox = document.createElement('div')
    const winnersLabel = document.createElement('h4')
    const winnersName = document.createElement('div')
    const votesLabel = document.createElement('h4')
    const winnersVotes = document.createElement('div')
    const description = document.createElement('div');
    const box = document.createElement('div');
    const details = document.createElement('div');
    const card = document.createElement('div');
    const column = document.createElement('div');
    
    name.classList.add('card__event-name');
    name.innerHTML = eventName;
    
    description.classList.add('card__event-description');
    
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
    
    
    winnersBox.classList.add('card__winners-box')
    
    winnersLabel.classList.add('card__winners-label')
    winnersLabel.innerHTML = 'Winner'
    
    winnersName.classList.add('card__winners-name')
    winnersName.innerHTML = candidateName
    
    votesLabel.classList.add('card__winners-votes-label')
    votesLabel.innerHTML = "Votes"
    
    winnersVotes.classList.add('card__winners-votes')
    winnersVotes.innerHTML = candidateVotes
    
    winnersBox.appendChild(winnersLabel)
    winnersBox.appendChild(winnersName)
    winnersBox.appendChild(votesLabel)
    winnersBox.appendChild(winnersVotes)
    
    box.classList.add('card__event_box');
    box.appendChild(name);
    box.appendChild(description);
    
    details.classList.add('card__event-details');
    details.appendChild(box);
    details.appendChild(winnersBox);
    
    card.classList.add('card');
    card.appendChild(details);

    column.classList.add('col-1-3');
    column.appendChild(card);
    
    return column;
    
  }
})()