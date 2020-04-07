const dogBar = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")
const baseURL = "http://localhost:3000"
fetch(baseURL + "/pups")
  .then(resp => resp.json())
  .then(dogData => {
    dogData.forEach(dogObject => {
      let span = document.createElement("span")
      let dogGoodnessStr = ""
      let dogGoodnessDataStr= ""
      if (dogObject.isGoodDog){
        dogGoodnessStr = "Good"
        dogGoodnessDataStr = "data-good-dog";
      } 
      else {
        dogGoodnessStr = "Bad"
      }
      let dogHTMLStr = `
        <div ${dogGoodnessDataStr} data-dog-id=${dogObject.id}>
        <img src=${dogObject.image}><br />
        <h2 >${dogObject.name}</h2><br />
        <button id="dogGoodnessBtn">${dogGoodnessStr} Dog!</button>
        </div>
      `
 

      span.innerText = dogObject.name
      span.addEventListener("click", e => {
        dogInfo.innerHTML = dogHTMLStr
        let dogGoodnessBtn = document.querySelector("#dogGoodnessBtn")
        dogGoodnessBtn.addEventListener("click", event => {

          // debugger
          const dogDiv = event.target.parentNode
          const button = event.target
          const isGoodDog = dogDiv.dataset["goodDog"] === "true"
          // debugger;
          if (isGoodDog){
            button.innerText = "Bad Dog!"
            delete dogDiv.dataset["goodDog"]
          }
          else {
            button.innerText = "Good Dog!"
            dogDiv.dataset["goodDog"] = true 
          }
          fetch(baseURL + `/pups/${dogDiv.dataset["dogId"]}`, {
            headers: {'Content-Type': 'application/json'},
            method: 'PATCH',
            body: JSON.stringify({isGoodDog: isGoodDog})
          })
        })
      })
      dogBar.append(span)
    })
  })

