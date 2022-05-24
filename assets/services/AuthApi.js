import axios from "axios";
import jwtDecode from "jwt-decode";

/**
 * 
 *  - Load the JWT as soon as the React app starts.
 *  - Check token when  app is refreshed or started
 */ 
async function  setup(){
    let token = window.localStorage.getItem("auth")
    if( token ){
        let { exp } =  await jwtDecode( token ); // get obj token:{ ..., exp: 1343433}
        if( exp * 1000 >  new Date().getTime()){ // Check token 
            setAxiosToken( token ) // Putting token
            return true;
        }
    }
    return false;
}


function setAxiosToken(token){
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

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
            setAxiosToken( token )
            return true;
        })
}

export default { 
    authenticate, 
    logout,
    setup,
}
