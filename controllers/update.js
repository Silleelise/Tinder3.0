var form = document.getElementById("update")

form.addEventListener('submit', function(e) {
    e.preventDefault()

    var email = document.getElementById("email").value
    var gender = document.getElementById("gender").value
    var city = document.getElementById("city").value
    var birthdate = document.getElementById("birthdate").value
    var name = document.getElementById("name").value


    fetch("http://localhost:7071/api/HttpTrigger1test", {
        method: 'PUT',
        body: JSON.stringify({
            email: email,
            gender: gender,
            city: city, 
            birthdate: birthdate,
            name: name,
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

var getButton = document.getElementById("getUsers")

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
})