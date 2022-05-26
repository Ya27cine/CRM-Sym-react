import React, {useState, useContext} from 'react';
import AuthApi from '../../services/AuthApi';
import AuthContext from '../../context/AuthContext';
import Field from '../../components/forms/Field';


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
           // console.log("error login",error)
            setErrors("error bad credentials")
        } 
    }

    return ( 
        <>
          <form onSubmit={handleSubmit}>
              <h1>Login</h1>
                
                <Field 
                 name="username" 
                 type="email"
                 label="Email address"
                 placeholder="example@email.com" 
                 value={credentials.email}  
                 onChange={handleChange} 
                 errors={errors} />

                <Field 
                 name="password" 
                 type="password"
                 label="Password"
                 value={credentials.password}  
                 onChange={handleChange} 
                 errors={errors} />

                <button 
                    type="submit"  
                    className="btn btn-success btn-block mt-3">
                    Sign in
                </button>
            </form>
        </>
     );
}
export default Login;