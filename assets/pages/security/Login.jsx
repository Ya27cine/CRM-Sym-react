import React, {useState, useContext} from 'react';
import AuthApi from '../../services/AuthApi';
import AuthContext from '../../context/AuthContext';

const Login = ({ history}) => {

    const {isAuthenticated, setIsAuthenticated } =  useContext(AuthContext)

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })
    const [errors, setErrors] = useState('')

    const handleChange =  ( {currentTarget} ) => {
        let {name, value} = currentTarget
        setCredentials({ ...credentials, [name]: value})
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await AuthApi.authenticate(credentials);
            setIsAuthenticated(true)
            setErrors('')
            // redirection   
            history.replace("/customers") 
            

        } catch (error) {
            setErrors(errors.response.message)
        } 
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
