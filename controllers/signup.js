var form = document.getElementById("form")

form.addEventListener('submit', function(e) {
    e.preventDefault()

    var email = document.getElementById("email").value
    var gender = document.getElementById("gender").value
    var region = document.getElementById("region").value
    var age = document.getElementById("age").value
    var name = document.getElementById("name").value
    var hashed_password = document.getElementById("hashed_password").value
    var interest = document.getElementById("interest").value

    fetch("http://localhost:7071/api/HttpTrigger1test", {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            gender: gender,
            region: region, 
            age: age,
            name: name,
            hashed_password: hashed_password,
            interest: interest
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
        sessionStorage.setItem('user',email);
        window.location.href = "profile.html";
    }).catch((err) =>{
        console.log(err)
    })
})