

var button = document.getElementById("logout")

// this function makes it possible to log out, by using removeItem method 
function logout(){
    let email = sessionStorage.removeItem('user');
    if (email == 'email'){
        // redirect to profile if the email == 'email'
        window.location.href = "profile.html" 
        console.log(email)
        return 
    }else{
        // else logout and redirect to login.html
        window.location.href = "login.html" 
    }
}


