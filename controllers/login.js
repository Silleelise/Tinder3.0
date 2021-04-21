
var form = document.getElementById("login")

        form.addEventListener('submit', function(e){
            e.preventDefault()
            
            var name = document.getElementById("name").value
            var city = document.getElementById("city").value

        fetch("http://localhost:7071/api/login", {
            method: 'POST',
            //redirect: 'follow',
            headers: {
                "Content-Type": "application/json; charset-UTF-8"    
            },
            body:JSON.stringify({ 
                name: name,
                city: city
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