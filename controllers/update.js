var form = document.getElementById("update")

function isAuth(){
    let email =  sessionStorage.getItem('email');
    if (email ){
        
    }else{

    }
}


form.addEventListener('submit', function(e) {
    e.preventDefault()

    var email = document.getElementById("email").value
    var gender = document.getElementById("gender").value
    var region = document.getElementById("region").value
    var age = document.getElementById("age").value
    var name = document.getElementById("name").value
    var interest = document.getElementById("interest").value


    fetch(`http://localhost:7071/api/updateuser`, {
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
            interest: interest
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