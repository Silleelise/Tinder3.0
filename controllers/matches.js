var form = document.getElementById("matches")

function isAuth(){
    let email = sessionStorage.getItem('email');
    if (email == null){
        console.log("nu er vi nået til linje 6")
        console.log(email)
        return 
    }else{
        window.location.href = "login.html" 
    }
}


form.addEventListener('submit', function(e) {
    e.preventDefault()

    var name = document.getElementById("name").value
    var gender = document.getElementById("gender").value
    var region = document.getElementById("region").value
    var age = document.getElementById("age").value


    fetch(`http://localhost:7071/api/getMatches`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        },
        body: JSON.stringify({
            name: name,
            gender: gender,
            region: region, 
            age: age
        }), 
       
    })
    .then((response) => {
        return response.json()
    })
    .then(function(data){
        console.log(data);
        document.getElementById("matchesfrom").innerHTML = data.name;
        document.getElementById("matchesfrom").innerHTML += data.region;
    })
    }).catch((err) =>{
        console.log(err)
    })



