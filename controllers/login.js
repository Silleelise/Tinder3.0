
var form = document.getElementById("login")

        form.addEventListener('submit', function(e){
            e.preventDefault()
            
            var name = document.getElementById("name").value
            var city = document.getElementById("city").value

        fetch("http://localhost:7071/api/login", {
            method: 'POST',
            body:JSON.stringify({ 
                name: name,
                city: city
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