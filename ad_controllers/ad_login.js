var form = document.getElementById("ad_login");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  var email = document.getElementById("email").value;
  var hashed_password = document.getElementById("hashed_password").value;

  fetch("http://localhost:7071/api/ad_login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset-UTF-8",
    },
    body: JSON.stringify({
      email: email,
      hashed_password: hashed_password,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      window.location.href = "ad_profile.html";
    })
    .catch((err) => {
      console.log(err);
    });
});