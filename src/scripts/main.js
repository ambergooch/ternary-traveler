import {API} from "./api.js"
import {render} from "./renderToDOM.js"

API.getInterests().then(render.renderInterestForm)