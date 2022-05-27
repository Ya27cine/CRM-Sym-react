import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Field from '../../components/forms/Field';
import Select from '../../components/forms/Select';
import CustomerApi from '../../services/CustomerApi';
import InvoiceApi from '../../services/InvoiceApi';

const InvoiceForm = ({match, history}) => {
    const {id} = match.params

    const [invoice, setInvoice] = useState({
        amount: '',
        customer: '',
        status: ''
    });
    const [errors, setErrors] = useState({
        amount: '',
        customer: '',
        status: ''
    });

    const [isEditing, setIsEditing] = useState(false);

    const [myCustomers, setMyCustomers] = useState([])
    const fetchMyCustomers = async () =>{
        await CustomerApi.findAll()
        .then(   data   =>   setMyCustomers(  data ))
        .catch(  error  =>   console.log( error)    )
    }
   
    const fetchInvoice= async (id) => {
        try {
            const data =  await InvoiceApi.find(id)
            const { amount, status, customer } = data;
            setInvoice( { amount, status, customer: customer.id } );
        } catch (error){
            console.log("error", error)
            history.replace("/invoices")
        }
    }

    useEffect(() => {
        fetchMyCustomers()
       
        if( id !== "new" ){
            setIsEditing(true);
            fetchInvoice(id)
        }

    }, [id])


    const handleChange =  ( {currentTarget} ) => {
        let {name, value} = currentTarget
        setInvoice({ ...invoice, [name]: value})
    }

    /**
     * Form submission management.
     */
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            // error customer not given
            if(!invoice.customer){
                setErrors({customer: "Please select a customer"});
                return;
            }
            if(isEditing){
                // await InvoiceApi.put( invoice )

            }else{
                await InvoiceApi.post( invoice )
            }         
            history.replace("/invoices")  
            setErrors({})

        } catch (error) {
            // TODO notify
            const apiErrors =  {};
            const { response } = error;

            if( response && response.data && response.data.violations ){
                const { violations } = response.data
                violations.forEach( ({propertyPath, message}) =>
                           apiErrors[propertyPath] = message);
                setErrors( apiErrors )
            }else{
                console.log(response)
            }   
        }
    }

    return ( 
        <>
             {
            (isEditing && <h1 className="mb-3">Invoice modification</h1> ) 
                       || <h1 className="mb-3">Invoice </h1>
        }  

        <form onSubmit={handleSubmit}>
            <Field 
                name="amount" 
                label="Amount"
                type="number"
                value={invoice.amount}  
                placeholder="Amount Invoice"
                onChange={handleChange} 
                required="required"
                errors={errors.amount} />

            <Select 
                required="required"
                name="customer" 
                label="Customer" 
                errors={errors.customer}
                value={invoice.customer}
                onChange={handleChange}
                >
                     <option key="_default" value="" > Choose customer</option>
                    { myCustomers.map( (customer) => 
                        <option key={customer.id} value={customer.id}> {customer.lastname} {customer.firstname}</option>
                    )}       
            </Select>

            <Select 
                required="required"
                name="status" 
                label="Status" 
                errors={errors.status}
                value={invoice.status}
                onChange={handleChange}
                >
                    <option value="" > Choose Status</option>
                    <option value="SENT">Sent</option>
                    <option value="CANCELLED">Cancelled</option>
                    <option value="PAID">Paid</option>
            </Select>

            <div className="form-group mt-2">
                    { ( isEditing &&  <button className="btn btn-danger" type="submit">Edit</button>)
                                  ||  <button className="btn btn-success" type="submit">Create</button>
                    }
                    <Link to="/invoices" className="btn btn-link">Back to the list</Link>
            </div>
        </form>
        </>
     );
}
 
export default InvoiceForm;
