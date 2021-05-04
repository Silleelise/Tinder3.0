var button = document.getElementById("checkstats");

button.addEventListener("click", function (e) {
  e.preventDefault();



  fetch("http://localhost:7071/api/getusers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset-UTF-8",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
        const html = [data]
        .map(data => {
            return `<p> Number of users in the database: ${data}
            `
        })
        console.log(html)
        document.querySelector("#activeUsers")
        .insertAdjacentHTML("beforeend",html);
    })
    .catch((err) => {
      console.log(err);
    });
});