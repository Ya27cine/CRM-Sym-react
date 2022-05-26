import axios from 'axios';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Field from '../../components/forms/Field';


const CustomerForm = () => {

    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        email: '',
        company: ''
    })

    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        email: '',
        company: ''
    })

    const handleChange =  ( {currentTarget} ) => {
        let {name, value} = currentTarget
        setCustomer({ ...customer, [name]: value})
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const result = await axios
                    .post("https://localhost:8000/api/customers", customer);
            console.log( result )
        } catch (error) {
            console.log( error.response.data )
            setErrors({...errors, firstname: "non valid"})
        }
    }

    return (  <>
        <h1 className="mb-3">Creating a customer</h1>

        <form onSubmit={handleSubmit}>

                <Field 
                    name="firstname" 
                    label="FirstName"
                    value={customer.firstname}  
                    placeholder="Customer's firstName"
                    onChange={handleChange} 
                    required="required"
                    errors={errors.firstname} />
                <Field 
                    name="lastname" 
                    label="LastName"
                    placeholder="Customer's lastName"
                    value={customer.lastname}  
                    onChange={handleChange} 
                    required="required"
                    errors={errors.lastname} />
                <Field 
                    name="email" 
                    label="Email address"
                    type="email"
                    placeholder="Customer's email"
                    value={customer.email}  
                    onChange={handleChange} 
                    required="required"
                    errors={errors.email} />
                <Field 
                    name="company" 
                    label="Company"
                    placeholder="Customer's company"
                    value={customer.company}  
                    onChange={handleChange} 
                    errors={errors.company} />

                <div className="form-group mt-2">
                    <button className="btn btn-success" type="submit">Create</button>
                    <Link to="/customers" className="btn btn-link">Back to the list</Link>
                </div>
        </form>
        

    </>);
}
 
export default CustomerForm;