var getButton = document.getElementById("deleteuser")

getButton.addEventListener("click", function(){
    var email = document.getElementById("email").value
    
    fetch(`http://localhost:7071/api/admin`, {
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
            })
            response.json()
            .then(function (data) {
                console.log(data);
                //window.location.href = "register.html";
        }
    )
    .catch(function (err){
        console.log(err);
    });
})
