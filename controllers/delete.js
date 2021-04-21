var getButton = document.getElementById("deleteUsers")

getButton.addEventListener("click", function(){
    var email = document.getElementById("email").value
    
    fetch(`http://localhost:7071/api/deleteuser?email=${email}`, {
        method: 'DELETE',
        body: JSON.stringify({ 
          email: email}),
          headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
      })
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
