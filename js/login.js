document.getElementById("loginButton").addEventListener("click",()=>{
    const usernameElement = document.getElementById("Username")
    const passwordElement = document.getElementById("password")
    const username = usernameElement.value
    const password = passwordElement.value
    if (!username) {
        console.log(username);
       return alert("username must be required")
        
    }
    if (!password) {
       return alert("password must be required")
        
    }
    if (username =="admin" && password=="admin123") {
       window.location.href ="main.html"
    } else{
        alert("username or password is not valid")
    }
})