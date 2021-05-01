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
    })
    .then(users => showMatches(users.results));
    }).catch((err) =>{
        console.log(err)
    })

showMatches = users => {
    const usersDiv = document.querySelector('#display-users');
users.forEach(user =>{
    const userElement = document.createElement('p');
    userElement.innerText = `Info om dine matches:
    ${user.name, user.age, user.gender, user.region}`;

    usersDiv.append(userElement)
});
}
