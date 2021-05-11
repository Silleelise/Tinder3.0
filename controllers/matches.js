
// get form from matches.html by using the method getElementById 
var form = document.getElementById("matches")

// function that keeps the user logged in
function isAuth(){
    let email = sessionStorage.getItem("user");
    if (email == null){
        console.log(email)
        window.location.href = "login.html"
    }else{
        return 
    }
}

// Listening on all id in the update.html
// using preventDefault, so the submit dosen't execute when the HTML page opens
form.addEventListener('submit', function(e) {
    e.preventDefault()

    var gender = document.getElementById("gender").value
    var region = document.getElementById("region").value

// fetch the URL which comes from the Azure function http trigger 
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
    // .then method returns a promise 
    // it takes a argument (reponse)
    .then(response => 
         response.json())
    // new promise that takes data and make a const html = data 
    .then(data =>{
        console.log(data);
        const html = data
        // The map() method creates a new array with the results of calling a function for every array element
        // it takes a html div and response with user + value. 
        // in line 50 it takes user + age = perfect answer of the user in the array
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
        // we join in an empty string
        .join("");
        console.log(html)
        // selecting the id matches 
        document.querySelector("#matches")
        // use insertAdjacentHTML method. It parses the text as html and inserts the resulting nodes into the DOM tree at a specified position
        .insertAdjacentHTML("beforeend",html);
    }).catch((err) =>{
        console.log(err)
    })
})




