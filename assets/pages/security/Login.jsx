import React, {useState} from 'react';
import axios from 'axios';
import CustomerApi from '../../services/CustomerApi';

const Login = () => {

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })
    const [errors, setErrors] = useState('')

    const handleChange =  (e) => {
        let name = e.currentTarget.name
        let value = e.currentTarget.value
        setCredentials({ ...credentials, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token =
            await axios.
                post("http://localhost:8000/api/login_check", credentials)
                .then(  (rep)  => rep.data.token ) // return token 
                .catch( (err)  =>{
                    console.log(err.response) 
                    setErrors(err.response.data.message)
                })
        setErrors('')
        window.localStorage.setItem("auth", token)
        axios.defaults.headers["Authorization"] = "Bearer " + token;
    }

    return ( 
        <>
          <form onSubmit={handleSubmit}>
              <h1>Login</h1>
                <div className="from-group">
                     <label className="form-label" htmlFor="_email">Email address</label>
                    <input name="username" type="email" id="_email" 
                        className={"form-control "+ ( errors && "is-invalid") }  
                        placeholder="example@email.com" 
                        value={credentials.email}
                        onChange={handleChange}
                    />
                     
                    { errors &&  <p className="invalid-feedback"> {errors} </p>}
                   
                </div>

                <div className="from-group">
                    <label className="form-label" htmlFor="_password">Password</label>
                    <input name="password" type="password" id="_password" 
                          className="form-control"  
                          placeholder="password ..." 
                         value={credentials.password}
                         onChange={handleChange}
                    />
                </div>

                <button type="submit"  className="btn btn-success btn-block mt-3">Sign in</button>

            </form>
        </>
     );
}
 
export default Login;
