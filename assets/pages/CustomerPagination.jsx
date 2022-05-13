import React , {useEffect, useState} from 'react'
import axios from "axios"
import Pagination from '../components/Pagination'

const CustomerPagination = () => {

    let countItmes = 10;

    const [ customers, setCustomers] =  useState([])
    const [ currentPage, setCurrentPage] =  useState(1)
    const [ totalItems, setTotalItems] =  useState(0)

    const handlPageChange = (page) => {
        setCurrentPage( page )
    }

    useEffect(() => {
         axios.get("http://localhost:8000/api/customers?pagination=true&count="+countItmes+"&page="+currentPage)
         .then( (res)   => {
             setCustomers( res.data['hydra:member'] )
             setTotalItems( res.data['hydra:totalItems'] );
         })
         .catch( (er)  => console.error(er) )
    }, [currentPage])


    const onDelete = (id) => {
        //Deletion: the optimistic approach and the pessimistic approach
        const customers_before = customers;
        // the optimistic approach 
        setCustomers(
            customers.filter( (item) => item.id != id)
        )
        axios.delete("/api/customers/"+id)
        .then( (res) => {
            // the pessimistic approach
            console.log("clicked handl delete !"+id, res)
        }).catch( (er)  => {
            setCustomers( customers_before )
            console.error(er) 
        })
    }


    return( 
     <>
     <h1>Customer list {Pagination}</h1>
         <table className="table table-hover">
            <thead>
                <tr>
                <th scope="col">ID.</th>
                <th scope="col">Customer</th>
                <th scope="col">Email</th>
                <th scope="col">Company</th>
                <th scope="col">Invoices</th>
                <th scope="col">Amount</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                { customers.map( (customer) => 
                    <tr key={customer.id}>
                        <th scope="row"> {customer.id} </th>
                        <td> <a href="#"> {customer.lastname} {customer.firstname}</a> </td>
                        <td> {customer.email} </td>
                        <td>{customer.company}</td>
                        <td> {customer.invoices.length} </td>
                        <td> {customer.totalAmount.toLocaleString()}</td>
                        <td>
                            <button className="btn btn-sm btn-primary mx-2">Edit</button>
                            <button 
                            disabled={ customer.invoices.length > 0}
                            onClick={() =>onDelete(customer.id)} 
                            className="btn btn-sm btn-danger">
                                Delete
                            </button>
                        </td>
                    </tr>
                  )
                }
                
            </tbody>
        </table>

        <Pagination 
            currentPage={currentPage}  
            length={totalItems}
            countItmes={countItmes}
            onHandlPageChange={handlPageChange}
        /> 
    </>
    );
}
 
export default CustomerPagination;