var form = document.getElementById("login");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // get value from email and hashed_password
  var email = document.getElementById("email").value;
  var hashed_password = document.getElementById("hashed_password").value;

// fetch the API url from the Azure Function
  fetch("http://localhost:7071/api/login", {
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
    // session storage setItem makes it possible to log in, using the user and email
    .then((data) => {
      console.log(data);
      sessionStorage.setItem('user',email);
      // redireict to profil.html when this line is completed 
      window.location.href = "profile.html";
    })
    .catch((err) => {
      console.log(err);
    });
});


/*var form = document.getElementById("logout");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  var email = document.getElementById("email").value;
  var hashed_password = document.getElementById("hashed_password").value;

  fetch("http://localhost:7071/api/login", {
    method: "GET",
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
    sessionStorage.setItem('user',email);
    window.location.href = "login.html";
    req.session.destroy(req.sessionemail);
  })
  .catch((err) => {
    console.log(err);
  });
});*/