function isAuth(){
    let email = sessionStorage.getItem("user");
    if (email == null){
        console.log(email)
        window.location.href = "login.html"
    }else{
        return 
    }
}