import { render } from "./renderToDOM.js"
import {API} from "./api.js"

const mainContainer = document.querySelector("#container")

const component = {
    createInterestObj (placeId, interestName, interestDesc, interestCost, interestReview){
        return {
            placeId: placeId,
            name: interestName,
            description: interestDesc,
            cost: interestCost,
            review: ""
        }
    },
    interestFactory (interestData) {
        let interest = {
            placeId: null,
            name: null,
            description: null,
            cost: null,
            review: null
        }
        for (let i = 0; i < interestData.length; i++) {
            if (i === 0) {
                interest.placeId = interestData[i]
            } else if (i === 1) {
                interest.name = interestData[i]
            }
            else if (i === 2) {
                interest.description = interestData[i]
            }
            else if (i === 3) {
                interest.cost = interestData[i]
            }
            else if (i === 4) {
                interest.review = interestData[i]
            }
        }
        return interest
    },

    createInterestForm () {
        const formContainer = document.createElement("div")
        formContainer.setAttribute("class", "form-container")
        mainContainer.prepend(formContainer)
        const submitBtn = document.createElement("button")
        submitBtn.textContent = "Add new attraction"

        formContainer.innerHTML = `
            <fieldset>
                <label for="interest-name">Name:</label>
                <input type="text" name="interest-name" id="interest-name">
            </fieldset>
            <fieldset>
                <label for="interest-description">Description:</label>
                <input type="text" name="interest-description" id="interest-description">
            </fieldset>
            <fieldset>
                <label for="interest-cost">Cost:</label>
                <input type="text" name="interest-cost" id="interest-cost">
            </fieldset>
            <fieldset>
                <label for="interest-place">Location:</label>
                <select name="interest-place" id="interest-place">
                </select>
            </fieldset>
        `
        formContainer.appendChild(submitBtn)
        this.submitInterestForm(submitBtn)
        return formContainer
    },

    submitInterestForm (submitBtn) {
        submitBtn.addEventListener("click", event => {
            const interestLocation = parseInt(document.querySelector("#interest-place").value);
            const interestName = document.querySelector("#interest-name").value;
            const interestDesc = document.querySelector("#interest-description").value;
            const interestCost = document.querySelector("#interest-cost").value;
            const interestReview = ""

            const interestArray = [interestLocation, interestName, interestDesc, interestCost, interestReview]
            const newInterest = this.interestFactory(interestArray)

            API.saveInterest(newInterest)
            .then(data => data.json())
            .then(interests => {
                console.log("saved")
                render.getAndDisplay()
            })
        })
    },

    createInterestComponent () {

    }
}

// var txt;

// var r = confirm("Press a button!");
// if (r == true) {
//   txt = "You pressed OK!";
// } else {
//   txt = "You pressed Cancel!";
// }

export {component}