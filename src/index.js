let dogBar = document.querySelector('#dog-bar')
let dogFilter = document.querySelector('#good-dog-filter')
let dogSummary = document.querySelector('#dog-summary-container')
let dogArray 


 let x = fetch('http://localhost:3000/pups')
         .then(response => response.json())
         .then(puppy => {
            puppy.forEach(puppy => dogAdder(puppy))
            dogArray = puppy
        })



function dogAdder(dog){
    let dogSpan = document.createElement('span')
    dogSpan.className = "doggo"
    dogSpan.dataset.id = dog.id
    dogSpan.innerText = dog.name 
    console.log(dogSpan)
    dogBar.append(dogSpan)
}

function dogSummaryDiv(dog){
    let status 
    if(dog.isGoodDog === true){
         status = 'turn bad'
    }
    else{
         status = 'turn good'
    }
    let dogSummary = document.querySelector('#dog-info')
    dogSummary.innerHTML = `
    <h2>${dog.name}</h2>
    <img src="${dog.image}">
    <button type="button" data-id=${dog.id}>${status}</button>
    `

}

dogBar.addEventListener('click', e=>{
    let dogChosen = e.target.innerText
    fetch('http://localhost:3000/pups')
        .then(response => response.json())
        .then(puppy => {
        let found = puppy.find(puppy => puppy.name === dogChosen)
        dogSummaryDiv(found)
        })
})


dogFilter.addEventListener('click', e=>{
    console.log(e.target.innerText  )
    if(e.target.innerText === "Filter good dogs: OFF") {
        e.target.innerText = "Filter good dogs: ON"
        dogBar.innerHTML = ""
        fetch('http://localhost:3000/pups')
        .then(response => response.json())
        .then(puppy => {
        puppy.filter(puppy=> puppy.isGoodDog === true).forEach(puppy => dogAdder(puppy))
        })
    }
    else{
        e.target.innerText = "Filter good dogs: OFF"
        dogBar.innerHTML = ""
        fetch('http://localhost:3000/pups')
        .then(response => response.json())
        .then(puppy => {
        puppy.forEach(puppy => dogAdder(puppy))
        })
    }
})



dogSummary.addEventListener('click', e=>{

    let dogID = e.target.dataset.id
    let status 
    if(e.target.innerText === 'turn good'){
        status = true
        e.target.innerText = 'turn bad'
    }else{
        status = false
        e.target.innerText = 'turn good'
    }



    fetch(`http://localhost:3000/pups/${dogID}`, {
    headers: { "Content-Type": "application/json" },
    method: 'PATCH',
    body: JSON.stringify({
    isGoodDog: status,
     })
    })



})