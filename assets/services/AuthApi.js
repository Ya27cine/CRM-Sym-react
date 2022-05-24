import axios from "axios";

function logout(){
    window.localStorage.removeItem("auth")
    delete axios.defaults.headers["Authorization"];
}

function authenticate(credentials){
     axios.
        post("http://localhost:8000/api/login_check", credentials)
        .then( response => response.data.token )
        .then( token => {
            window.localStorage.setItem("auth", token)
            axios.defaults.headers["Authorization"] = "Bearer " + token;
            return true;
        })
}

export default { 
    authenticate, 
    logout 
}