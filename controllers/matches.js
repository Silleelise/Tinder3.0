var form = document.getElementById("matches")

function isAuth(){
    let email = sessionStorage.getItem("user");
    if (email == null){
        console.log("nu er vi nået til linje 6")
        console.log(email)
        window.location.href = "register.html"
    }else{
        return 
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
    .then(data =>{
        console.log(data);
        const html = [data]
        .map(user =>{
            return `
            <div class = "user">
            <p>Alder på dit match: ${user.age}</p>
            <br>
            <p>Køn på dit match: ${user.gender}</p>
            <br>
            <p>Navn på dit match: ${user.name}</p>
            <br>
            <p>Hvilken region dit match bor i: ${user.region}
            </div>`;
        })
        .join("");
        console.log(html)
        document.querySelector("#matches")
        .insertAdjacentHTML("beforeend",html);
    }).catch((err) =>{
        console.log(err)
    })
})



