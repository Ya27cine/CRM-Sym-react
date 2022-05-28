import jwtDecode from "jwt-decode";
import Http from './Http'


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
   return  setup();
}

/**
 * HTTP request for authentication.
 * Saving the token in LocalStorage and Axios.
 * @param {object} credentials 
 */
 async function authenticate(credentials){
    await Http.post("login_check", credentials)
        .then( response => response.data.token )
        .then( token => {
            window.localStorage.setItem("auth", token)
            setAxiosToken( token )
            return true;
        })
}

function setAxiosToken(token){
    Http.defaults.headers["Authorization"] = "Bearer " + token;
}

/**
 * Delete the token from LocalStorage and Axios.
 */
function logout(){
    window.localStorage.removeItem("auth")
    delete Http.defaults.headers["Authorization"];
}

function register(user){
   return Http.post("users", user)
}


export default { 
    authenticate, 
    logout,
    setup,
    register,
    isAuthenticated,
}
