import {component} from "./component.js"

const render = {
    renderInterestsToDOM (interests) {
        for (let i = 0; i > interests.length; i++) {
            document.querySelector("#container").appendChild(functionz)
        }
    },
    renderInterestForm () {
            document.querySelector("#container").appendChild(component.createInterestForm())
    },
    getAndDisplay() {
        document.querySelector("#container").innerHTML = ""
        API.getInterests()
        .then(renderInterestToDom)
    }
}

export {render}