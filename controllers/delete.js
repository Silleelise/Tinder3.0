var getButton = document.getElementById("deleteUsers")

getButton.addEventListener("click", function(){
    var name1 = document.getElementById("name").value
    
    fetch(`https://example.com/HttpTrigger1test, ${name1}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
      //Then with the data from the response in JSON...
      .then((data) => {
        console.log('Success:', data);
      })
      //Then with the error genereted...
      .catch((error) => {
        console.error('Error:', error);
      });

});
