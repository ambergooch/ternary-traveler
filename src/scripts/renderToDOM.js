import {component} from "./component.js"
import {API} from "./api.js"

const render = {
    renderInterestsToDOM (interests) {
        for (let i = 0; i > interests.length; i++) {
            document.querySelector("#container").appendChild(component.createInterestComponent(interests[i]))
        }
    },
    renderInterestForm () {
            document.querySelector("#container").appendChild(component.createInterestForm())
    },
    getAndDisplay() {
        document.querySelector("#container").innerHTML = ""
        API.getInterests()
        .then(this.renderInterestsToDOM)
    }
}

export {render}