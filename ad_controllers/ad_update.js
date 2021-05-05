var form = document.getElementById("updateuser")

form.addEventListener('submit', function(e) {
    e.preventDefault()

    var email = document.getElementById("email").value
    var gender = document.getElementById("gender").value
    var region = document.getElementById("region").value
    var age = document.getElementById("age").value
    var name = document.getElementById("name").value
    var id = document.getElementById("id").value


    fetch(`http://localhost:7071/api/ad_update`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        },
        body: JSON.stringify({
            email: email,
            gender: gender,
            region: region, 
            age: age,
            name: name,
            id: id
        }), 
       
    })
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
    }).catch((err) =>{
        console.log(err)
    })
})