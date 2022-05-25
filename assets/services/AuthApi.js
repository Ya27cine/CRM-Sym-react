import axios from "axios";
import jwtDecode from "jwt-decode";

/**
 *  Load the JWT as soon as the React app starts.
 *  Check token when  app is refreshed or started
 */ 
function setup(){
    let token = window.localStorage.getItem("auth")
    if( token ){
        let { exp } =  jwtDecode( token ); // get obj token:{ ..., exp: 1343433}
        if( exp * 1000 >  new Date().getTime()){ // Check token 
            setAxiosToken( token ) // Putting token
            return true;
        }
    }
    return false;
}
/**
 * Check token is valid.
 * @return bool
 */
function isAuthenticated(){
   return  setup(); e
}

/**
 * HTTP request for authentication.
 * Saving the token in LocalStorage and Axios.
 * @param {object} credentials 
 */
 async function authenticate(credentials){
    await axios.
        post("http://localhost:8000/api/login_check", credentials)
        .then( response => response.data.token )
        .then( token => {
            window.localStorage.setItem("auth", token)
            setAxiosToken( token )
            return true;
        })
}

function setAxiosToken(token){
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

/**
 * Delete the token from LocalStorage and Axios.
 */
function logout(){
    window.localStorage.removeItem("auth")
    delete axios.defaults.headers["Authorization"];
}


export default { 
    authenticate, 
    logout,
    setup,
    isAuthenticated,
}
