var form = document.getElementById("matches")

function isAuth(){
    let email = sessionStorage.getItem("user");
    if (email == null){
        console.log(email)
        window.location.href = "login.html"
    }else{
        return 
    }
}


form.addEventListener('submit', function(e) {
    e.preventDefault()

    var gender = document.getElementById("gender").value
    var region = document.getElementById("region").value

    fetch(`http://localhost:7071/api/getMatches`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        },
        body: JSON.stringify({
            gender: gender,
            region: region
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



