var form = document.getElementById("form")

form.addEventListener('submit', function(e) {
    e.preventDefault()

    var email = document.getElementById("email").value
    var gender = document.getElementById("gender").value
    var city = document.getElementById("city").value
    var birthdate = document.getElementById("birthdate").value
    var name = document.getElementById("name").value
    var hashed_password = document.getElementById("hashed_password").value

    fetch("http://localhost:7071/api/HttpTrigger1test", {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            gender: gender,
            city: city, 
            birthdate: birthdate,
            name: name,
            hashed_password: hashed_password
        }), 
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
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