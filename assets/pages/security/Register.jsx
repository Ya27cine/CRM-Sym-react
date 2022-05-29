import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Field from '../../components/forms/Field';
import AuthApi from '../../services/AuthApi';
import { toast } from 'react-toastify';


const Register = ({history}) => {

    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange =  ( {currentTarget} ) => {
        let {name, value} = currentTarget
        setUser({ ...user, [name]: value})
    }

    /**
     * Form submission management.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check password
        if( user.password !== user.confirmPassword ){
            // notify : 
            toast.error("form has error ! ", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1770
            });
            setErrors({confirmPassword: "The two password  don't match."})
            return;
        }
        try {
            const res = await AuthApi.register( user )
            console.log( res )
            // redirect :
            history.replace('/login');
        } catch ({response}) {
            // notify : 
            toast.error("form has error ! ", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1770
              });

             const apiErrors =  {};
             if( response && response.data && response.data.violations ){
                 const { violations } = response.data
                 violations.forEach( ({propertyPath, message} ) =>
                            apiErrors[propertyPath] = message);
                 setErrors( apiErrors )
             }else{
                 console.log(response)
             }   
        }
    }

    return ( <>
    <h1>Register</h1>

    <form onSubmit={handleSubmit}>
        <Field 
            required="required"
            name="firstname" 
            label="First Name" 
            onChange={handleChange} 
            value={user.firstname}  
            errors={errors.firstname}
        />

        <Field 
            required="required"
            name="lastname" 
            label="Last Name" 
            onChange={handleChange} 
            value={user.lastname}  
            errors={errors.lastname}
        />

        <Field 
            name="email" 
            label="Email" 
            onChange={handleChange} 
            type="email"
            value={user.email}  
            errors={errors.email}
        />

        <Field 
            required="required"
            name="password" 
            label="Password" 
            type="password"
            onChange={handleChange} 
            value={user.password}  
            errors={errors.password}
        />

        <Field 
            required="required"
            name="confirmPassword" 
            label="Confirm password" 
            type="password"
            onChange={handleChange} 
            value={user.confirmPassword}  
            errors={errors.confirmPassword}
        />

        <p className="mt-2"> <small> By clicking on create, you agree to <a href=""> our terms & condition. </a> </small> </p>

         <div className="form-group mt-2">
            <button className="btn btn-success" type="submit">Create</button>
            <Link to="/login" className="btn btn-link">Already have an account ?</Link>
        </div>
    </form>
    
    </> );
}
 
export default Register;
