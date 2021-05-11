
// get the form from update.html page by id 
var form = document.getElementById("update")

// function to make session storage to work
function isAuth(){
    let email = sessionStorage.getItem("user");
    if (email == null){
        console.log("nu er vi nået til linje 6")
        console.log(email)
        window.location.href = "login.html"
    }else{
          return 
    }
}

// Listening on all id in the update.html
form.addEventListener('submit', function(e) {
    e.preventDefault()

    var email = document.getElementById("email").value
    var gender = document.getElementById("gender").value
    var region = document.getElementById("region").value
    var age = document.getElementById("age").value
    var name = document.getElementById("name").value
    var interest = document.getElementById("interest").value

// fetch the URL which comes from the Azure function http trigger 
    fetch(`http://localhost:7071/api/updateuser`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        },
        // stringify the body to JSON format
        body: JSON.stringify({
            email: email,
            gender: gender,
            region: region, 
            age: age,
            name: name,
            interest: interest
        }), 
       
    })
    // then method returns the promise from the API which is getting the promise from the db.js
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
    }).catch((err) =>{
        console.log(err)
    })
})





/*var getButton = document.getElementById("getUsers")

getButton.addEventListener("click", function(){
    var name1 = document.getElementById("name").value
    fetch(`http://localhost:7071/api/user?name=${name1}`)
        .then(
            function(response){
                if (response.status !== 200){
                    console.log("Noget gik galt" + response.status);
                    return;
                }

                response.json().then(function (data) {
                    console.log(data);
                });
            }
        )
        .catch(function (err){
            console.log(err);
        });
})*/