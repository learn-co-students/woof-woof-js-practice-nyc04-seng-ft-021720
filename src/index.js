
// global variables--placed here for convenience, but in future should consider adjusting their scope for best practice.
// selected dogbar for attaching all dogs, display to select the display area, and single dog span to ensure only one dog would be shown at a time.
const dogBar = document.querySelector('#dog-bar')
const display = document.querySelector('#dog-info')
const singleDogSpan = document.createElement('span')
const goodDogFilterButton = document.querySelector('#good-dog-filter')
goodDogFilterButton.isOn = false
let filteredDogArray = []

// fetch request for rendering homepage
        function initialRender(dogArray){
        return fetch('http://localhost:3000/pups')
        .then((response) => {
            return response.json();
        })
        .then((dogArray) => {
            dogArray.forEach(renderDog)
        });
    }

function renderDog(dog){
    const dogSpan = document.createElement('span')

    dogSpan.innerText = `${dog.name}`
    dogSpan.id = `${dog.id}`
    dogBar.append(dogSpan)
}

dogBar.addEventListener("click", function(e){
    let dogSpan = document.getElementById(`${e.target.id}`)
    
    if (dogSpan)
    return fetch(`http://localhost:3000/pups/${dogSpan.id}`)
    .then((response) => {
        return response.json();
    })
    .then((dog) => {
        return displayDog(dog)
    })
})

function displayDog(dog){ 
    
    singleDogSpan.innerHTML = `
    <img src=${dog.image}>
    <h2>${dog.name}</h2>
    `
    const goodDogButton = document.createElement('button')
    goodDogButton.id = "good-dog"
    if (dog.isGoodDog === true){
        goodDogButton.innerText = "Good Dog!"
    }else {
        goodDogButton.innerText = "Bad Dog!"
    }
    
    goodDogButton.addEventListener("click", function(e){
        const dogId = dog.id
        let goodBoy = dog.isGoodDog
        if (dog.isGoodDog === true){
            dog.isGoodDog = !dog.isGoodDog
            goodDogButton.innerText = "Bad Dog!"
        }else {
            dog.isGoodDog = !dog.isGoodDog
            goodDogButton.innerText = "Good Dog!"
    }
        fetch(`http://localhost:3000/pups/${dogId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({isGoodDog: goodBoy})
        })
    })

    
    singleDogSpan.append(goodDogButton)
    display.append(singleDogSpan)
}

goodDogFilterButton.addEventListener("click", function(e){
    
    if (goodDogFilterButton.isOn === false) {
        dogBar.innerHTML = ""
        goodDogFilterButton.isOn = true
        goodDogFilterButton.innerText = "Filter good dogs: ON"
        fetch('http://localhost:3000/pups')
        .then((response) => {
        return response.json();
        })
        .then((dogArray) => {
            dogArray.filter(function(dog){
                if (dog.isGoodDog === true)
                filteredDogArray.push(dog)
            })
            filteredDogArray.forEach(renderDog)
            filteredDogArray = [];
        });

    }else if (goodDogFilterButton.isOn === true){
        dogBar.innerHTML = ""
        goodDogFilterButton.isOn = false
        goodDogFilterButton.innerText = "Filter good dogs: OFF"
        fetch('http://localhost:3000/pups')
        .then((response) => {
            return response.json();
        })
        .then((dogArray) => {
            dogArray.forEach(renderDog)
        });
    }
})

