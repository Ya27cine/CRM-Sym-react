import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Field from '../../components/forms/Field';
import CustomerApi from '../../services/CustomerApi';
import { toast } from 'react-toastify';
import FormLoader from '../../components/loader/FormLoader';


const CustomerForm = (props) => {

    const { id = "new" } = props.match.params;
    const [isEditing, setIsEditing] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

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

    /**
     * Get customer data , When user choices mode editing
     * @param { customer id }
     */
    const fetchCustomer = async (id) => {
        try {
            const data =  await CustomerApi.find(id)
            const {firstname, lastname, email, company} = data
            setCustomer( {firstname, lastname, email, company} )
            setIsLoading( false )
        } catch (error){
            //TODO notif 
            props.history.replace("/customers")
        }
    }

    /**
     * Check mode editing 
     *      && 
     * Loading customer data 
     */
    useEffect(() => {
        if(id !== "new"){
           setIsLoading( true )
           setIsEditing( true)
           fetchCustomer(id)
        }
    }, [id])

    const handleChange =  ( {currentTarget} ) => {
        let {name, value} = currentTarget
        setCustomer({ ...customer, [name]: value})
    }

    /**
     * Form submission management.
     */
    const handleSubmit = async e => {
        e.preventDefault();
        try {
                let notify_msg = ''
                if(isEditing){
                    await CustomerApi.put(id, customer)
                    notify_msg = "The edition went well"
                }else{
                   await CustomerApi.post( customer )
                   notify_msg = "The creation went well"
                }         
                setErrors({})
                // notify
                toast.success( notify_msg, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 970
                });
                props.history.replace("/customers")  
        } catch ({response}) {
            // notify
            toast.error("form has error ! ", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1770
              });

            const apiErrors =  {};
            const { violations } = response.data
            if( violations ){
                violations.forEach( ({propertyPath, message}) =>
                           apiErrors[propertyPath] = message);
                setErrors( apiErrors )
            }else{
                console.log(response)
            }       
        }
    }

    return (  <>
        {
            (isEditing && <h1 className="mb-3">Customer modification</h1> ) 
                       || <h1 className="mb-3">Creating a customer</h1>
        }  

        { isLoading && <FormLoader /> }

        {! isLoading && 

        <>
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
                { ( isEditing &&  <button className="btn btn-danger" type="submit">Edit</button>)
                            ||  <button className="btn btn-success" type="submit">Create</button>
                }
            
                <Link to="/customers" className="btn btn-link">Back to the list</Link>
            </div>
            </form>
        </>}

    </>);
}
 
export default CustomerForm;