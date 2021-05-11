
// get the form from update.html page by id 
var form = document.getElementById("form")

// Listening on all id in the update.html
// using preventDefault, so the submit dosen't execute when the HTML page opens 
form.addEventListener('submit', function(e) {
    e.preventDefault()

    var email = document.getElementById("email").value
    var gender = document.getElementById("gender").value
    var region = document.getElementById("region").value
    var age = document.getElementById("age").value
    var name = document.getElementById("name").value
    var hashed_password = document.getElementById("hashed_password").value
    var interest = document.getElementById("interest").value

   // fetch the URL which comes from the Azure function http trigger 
    fetch("http://localhost:7071/api/HttpTrigger1test", {
        method: 'POST',
        // stringify the body to JSON format
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
    // return Promise with reponse in JSON format
    .then((response) => {
        return response.json()
    })
    //use session storage and redirect to profile.html
    .then((data) => {
        console.log(data)
        sessionStorage.setItem('user',email);
        window.location.href = "profile.html";
    }).catch((err) =>{
        console.log(err)
    })
})