import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Pagination from '../../components/Pagination'
import CustomerApi from '../../services/CustomerApi'
import  TableLoader from '../../components/loader/TableLoader';
import { toast } from 'react-toastify';


const CustomerPagination = ( props ) => {

    const [isLoading, setIsLoading] = useState(true)
    const [ customers, setCustomers] =  useState([])
    const [ currentPage, setCurrentPage] =  useState(1)
    const [ totalItems, setTotalItems] =  useState(0)
    const [ search, setSearch] =  useState('')
    // max shown customers
    let countItems = 10;
    
    useEffect(() => {
        CustomerApi.findAll(countItems, currentPage, search)
        .then( (data) =>{
            setCustomers( data.customers );
            setTotalItems( data.totalItems );
            setIsLoading( false )
        }).catch( e=>console.log(e));
       
    }, [currentPage, search])

     // change current page when clicked on pagination
     const handlePageChange = page => setCurrentPage( page )

    // delete one customer
    const onDelete = async (id) => {
        //Deletion: the optimistic approach and the pessimistic approach
        const customers_before = [...customers];
        setCustomers( customers.filter( item => item.id != id) )
        try 
        {
            let res = await CustomerApi.delete(id)
            console.log("clicked handle delete !"+id, res)
            // notify
            toast.success("deleted !", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 970
              });
        } catch (er) {
            setCustomers( customers_before )
            // notify
            toast.error("You can't delete it  !", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2770
              });
            console.error(er) 
        }
        // if the last item { update pagination}
        if( customers.length == 1) setCurrentPage( currentPage -1);  
        console.log("============>>>>", customers.length, ' ', currentPage)
    }
    // search with field: first-name 
    const handleSearch = ({currentTarget}) => {
        setSearch( currentTarget.value)
        setCurrentPage( 1 )
    }

    return( 
     <>
        <div className="mb-2 d-flex justify-content-between align-items-center">
            <h1>Customer list </h1>
            <Link to="/customers/new" className="btn btn-primary">Create a customer</Link>
        </div>

        { isLoading &&  <TableLoader />}
        { ! isLoading && <> 

        <div className="form-group">
            <input  className="form-control" 
                value={search}
                onChange={handleSearch}
                type="text" 
                name="search" 
                id="search"  
                placeholder="Search ... {first-name}" />
        </div>
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
                            <td> 
                                 <Link to={"/customers/"+customer.id}> 
                                    {customer.lastname} {customer.firstname}
                                 </Link> 
                            </td>
                            <td> {customer.email} </td>
                            <td>{customer.company}</td>
                            <td> {customer.invoices.length} </td>
                            <td> {customer.totalAmount.toLocaleString()}</td>
                            <td>
                                <Link to={"/customers/"+customer.id} className="btn btn-sm btn-primary mx-2">Edit</Link>
                                <button 
                                disabled={ customer.invoices.length > 0}
                                onClick={() =>onDelete(customer.id)} 
                                className="btn btn-sm btn-danger">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )}          
                </tbody>
            
        </table> 

        {totalItems > countItems 
         && <Pagination 
                currentPage={currentPage}  
                length={totalItems}
                countItems={countItems}
                onHandlePageChange={handlePageChange}
        /> }
    </>}
       
    </>
    );
}
 
export default CustomerPagination;