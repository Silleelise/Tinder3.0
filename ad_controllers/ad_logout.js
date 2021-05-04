var button = document.getElementById("logout")

function ad_logout(){
    let email = sessionStorage.removeItem('user');
    if (email == 'email'){
        window.location.href = "ad_login.html" 
        console.log(email)
        return 
    }else{
        window.location.href = "ad_login.html" 
    }
}