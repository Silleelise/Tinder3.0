/*form = document.getElementById("login")

        form.addEventListener("submit", function(e){
            e.preventDefault()
        
            var name = document.getElementById("name").value
            
               
            fetch(`http://localhost:7071/api/login`,  {
                method: 'POST',
                body: JSON.stringify({ 
                    name: name
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
                        console.log(err + "sille")
                    })
                })*/
        