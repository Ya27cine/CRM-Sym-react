import axios from "axios";

function authentication(credentials){
     axios.
        post("http://localhost:8000/api/login_check", credentials)
        .then(  (rep)  => rep.data.token )
        .then( token => {
            window.localStorage.setItem("auth", token)
            axios.defaults.headers["Authorization"] = "Bearer " + token;
            return true;
        })
}
export default { authentication }