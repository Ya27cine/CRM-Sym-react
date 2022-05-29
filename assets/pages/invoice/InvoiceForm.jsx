import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Field from '../../components/forms/Field';
import Select from '../../components/forms/Select';
import CustomerApi from '../../services/CustomerApi';
import InvoiceApi from '../../services/InvoiceApi';
import { toast } from 'react-toastify';
import FormLoader from '../../components/loader/FormLoader';


const InvoiceForm = ({match, history}) => {
    const {id = "new"}  = match.params

    const [isLoading, setIsLoading] = useState(true)

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
        .then(   data   => {  setMyCustomers(  data ); setIsLoading(false) })
        .catch(  error  =>   console.log( error)    )
    }
   
    /**
     * Get invoice data , When user choices mode editing
     * @param { customer id }
     */
    const fetchInvoice = async (id) => {
        try {
            const { amount, status, customer }  =  await InvoiceApi.find( id )
            setInvoice( { amount, status, customer: customer.id } );
        } catch (error){
            history.replace("/invoices")
        }
    }

    /**
     * Check mode editing 
     *      && 
     * Loading invoice data 
     */
    useEffect(() => {

        if( id !== "new" ){
            setIsEditing(true);
            fetchInvoice(id)
        }
    }, [id])

    /**
     * Get my list customers
     */
    useEffect(() =>{ fetchMyCustomers();}, [])

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
            if(!invoice.customer){
                setErrors({customer: "Please select a customer"});
                return;
            }
            if(isEditing){
                await InvoiceApi.put( id, invoice )
            }else{
                await InvoiceApi.post( invoice )
            }         
            setErrors({})
            history.replace("/invoices")  

        } catch ({ response }) {
            // notify
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

    return ( 
        <>
             {
            (isEditing && <h1 className="mb-3">Invoice modification</h1> ) 
                       || <h1 className="mb-3">Create a invoice </h1>
        }  

        {
            isLoading &&  <FormLoader />
        }

        { 
            ! isLoading &&
            <>
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
        }
     </>);
}
 
export default InvoiceForm;
