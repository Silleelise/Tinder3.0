var button = document.getElementById("logout")

function logout(){
    let email = sessionStorage.removeItem('user');
    if (email == 'email'){
        window.location.href = "profile.html" 
        console.log(email)
        return 
    }else{
        window.location.href = "login.html" 
    }
}


/*
button.addEventListener('click', function(e)) {

}
*/