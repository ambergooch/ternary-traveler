import {component} from "./component.js"
import {API} from "./api.js"

const render = {
    renderInterestsToDOM (interestArray) {
        for (let i = 0; i < interestArray.length; i++) {
            document.querySelector("#container").appendChild(component.createInterestComponent(interestArray[i]))
        }
    },
    renderInterestForm () {
            document.querySelector("#container").appendChild(component.createInterestForm())
    },
    getAndDisplay() {
        document.querySelector("#interest-list").innerHTML = ""
        API.getInterests()
        .then(this.renderInterestsToDOM)
    }
}

export {render}