var getButton = document.getElementById("deleteUsers")

getButton.addEventListener("click", function(){
    var email = document.getElementById("email").value
    
    fetch(`http://localhost:7071/api/deleteuser`, {
        method: 'DELETE',
        body: JSON.stringify({ 
          email: email}),
          headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
      })
      .then(
          // this function have a problem
          // deleting a user is working, but the redirect is not working well
        function(response){
            if (response.status !== 200){
                console.log("Noget gik galt" + response.status);
                return;
            }
            })
            response.json()
            .then(function (data) {
                console.log(data);
                alert("user is deleted")
        }
    )
    .catch(function (err){
        console.log(err);
    });
})
