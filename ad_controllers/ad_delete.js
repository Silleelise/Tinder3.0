var getButton = document.getElementById("deleteuser")

getButton.addEventListener("click", function(){
    var id = document.getElementById("id").value
    
    fetch(`http://localhost:7071/api/ad_delete`, {
        method: 'DELETE',
        body: JSON.stringify({ 
          id: id}),
          headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
      })
      .then(
        function(response){
            if (response.status !== 200){
                console.log("Noget gik galt" + response.status);
            }
            })
            return response.json()
            .then(function (data) {
                console.log(data);
                 return window.location.href = "ad_stats.html";
        }
    )
    .catch(function (err){
        console.log(err);
    })
});
