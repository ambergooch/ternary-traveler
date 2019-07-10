const API = {
    getInterests () {
        return fetch ("http://localhost:8088/interests?_expand=place")
            .then(response => response.json())
    },
    getPlaces () {
        return fetch ("http://localhost:8088/places")
            .then(response => response.json())
    },
    saveInterest (newInterest) {
        return fetch ("http://localhost:8088/interests", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newInterest)
        })
    },
    editInterest (editedInterest) {
        return fetch(`http://localhost:8088/interests/${editedInterest.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedInterest)
        })
    },
    deleteInterest (id) {
        return fetch(`http://localhost:8088/interests/${id}`, {
            method: "DELETE",
            headers:{
                "Content-Type": "application/json"
            }
        })
    }
}

export {API}