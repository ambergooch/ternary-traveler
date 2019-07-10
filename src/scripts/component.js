import { render } from "./renderToDOM.js"
import {API} from "./api.js"

const mainContainer = document.querySelector("#container")
let parentDiv = document.createElement("div")
parentDiv.setAttribute("id", "interest-list")

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
                <input type="number" name="interest-cost" id="interest-cost" min="0.00" max="10000.00" step="0.01">
            </fieldset>
            <fieldset>
                <label for="interest-place">Location:</label>
                <select name="interest-place" id="interest-place">
                </select>
            </fieldset>
        `
        this.populatePlaces()
        formContainer.appendChild(submitBtn)
        this.submitInterestForm(submitBtn)
        return formContainer
    },

    populatePlaces () {
        API.getPlaces().then(places => {
            places.forEach(place => {
                const placeSelect = document.querySelector("#interest-place")
                placeSelect.innerHTML += `<option value=${place.id}>${place.name}</option>`
            })
        })
    },

    submitInterestForm (submitBtn) {
        submitBtn.addEventListener("click", event => {
            const interestLocation = parseInt(document.querySelector("#interest-place").value)
            const interestName = document.querySelector("#interest-name").value
            const interestDesc = document.querySelector("#interest-description").value
            const interestCost = document.querySelector("#interest-cost").value
            const interestReview = ""

            const interestArray = [interestLocation, interestName, interestDesc, interestCost, interestReview]
            const newInterest = this.interestFactory(interestArray)

            API.saveInterest(newInterest)
            .then(data => data.json())
            .then(interests => {
                console.log("saved")
                render.getAndDisplay()
                // API.getInterests().then(render.renderInterestsToDOM)
            })
        })
    },

    createInterestComponent (interest) {

        let childDiv = document.createElement("div")
        let editBtn = document.createElement("button")
        let deleteBtn = document.createElement("button")
        childDiv.setAttribute("id", `interest-${interest.id}`)

        if (interest.review === "") {
            childDiv.innerHTML = `
                <div>
                    <h3>${interest.name}</h3>
                    <p><strong>Description:</strong> ${interest.description}</p>
                    <p><strong>Cost:</strong> ${interest.cost}</p>
                    <p><strong>Place:</strong> ${interest.place.name}</p>
                </div>
            `
        } else {
            childDiv.innerHTML = `
                <div>
                    <h3>${interest.name}</h3>
                    <p><strong>Description:</strong> ${interest.description}</p>
                    <p><strong>Cost:</strong> ${interest.cost}</p>
                    <p><strong>Place:</strong> ${interest.place.name}</p>
                    <p><strong>Review:</strong> ${interest.review}</p>
                </div>
            `

        }
        editBtn.textContent = "edit"
        editBtn.addEventListener("click", () => {
            console.log(childDiv.id)
            let editForm = this.createEditForm(interest)
            this.addEditFormToDOM(childDiv.id, editForm)
        })
        deleteBtn.textContent = "delete"
        deleteBtn.addEventListener("click", () => {
            console.log("click")

            const result = confirm("Are you sure you want to delete this point of interest?");
            if (result === true) {
                API.deleteInterest(interest.id)
                .then(data => {
                    render.getAndDisplay()
                })
            }
        })
        childDiv.appendChild(editBtn)
        childDiv.appendChild(deleteBtn)
        parentDiv.appendChild(childDiv)

        return parentDiv
    },
    createEditForm (interest) {
        return `
        <input type="hidden" id="interest-id" value=${interest.id}>
        <fieldset>
            <h3>${interest.name}</h3>
            <p><strong>Description:</strong> ${interest.description}</p>
            <label for="interest-cost">Cost:</label>
            <input type="number" name="interest-cost" id="interest-cost-edit" min="0.00" max="10000.00" step="0.01" value="${interest.cost}">

            <label for="interest-review">Add a review:</label>
            <input type="text" name="interest-review" id="interest-review-edit" value="${interest.review}">
            <button id="save-btn">Save</button>
        </fieldset>
        `
    },
    addEditFormToDOM(interestToEdit, editForm) {
        document.querySelector(`#${interestToEdit}`).innerHTML = editForm
        document.querySelector("#save-btn").addEventListener("click", () => {
            const location = parseInt(document.querySelector("#interest-place").value)
            const name = document.querySelector("#interest-name").value
            const description = document.querySelector("#interest-description").value

            const cost = document.querySelector("#interest-cost-edit").value
            const review = document.querySelector("#interest-review-edit").value

            const interestId = document.querySelector("#interest-id").value

            const editArray = [location, name, description, cost, review]
            const editedInterest = this.interestFactory(editArray)
            console.log(interestId)
            editedInterest.id = interestId

            API.editInterest(editedInterest)
            .then( () => {
                render.getAndDisplay()
            })
        })
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