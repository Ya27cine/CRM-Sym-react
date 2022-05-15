import React, {useEffect, useState} from 'react'
import moment from 'moment';
import Currencies from './../services/Currencies'
import Pagination from '../components/Pagination';
import InvoiceApi from '../services/InvoiceApi';

const InvoicePagination = () => {

    const [invoices, setInvoices] = useState([])
    const [ currentPage, setCurrentPage] =  useState(1)
    const [ totalItems, setTotalItems] =  useState(0)
    const [ search, setSearch] =  useState('')

     // max shown customers
     let countItems = 37;

    const Status_CLasses = {
        'CANCELLED': 'warning',
        'SENT': 'dark',
        'PAID': 'success',
    }

    // change current page when clicked on pagination
    const handlePageChange = page => setCurrentPage( page )

    useEffect(() => {   
         InvoiceApi.findAll(countItems, currentPage, search)
                .then( (res) =>  {
                    setInvoices(   res.data['hydra:member']) 
                    setTotalItems( res.data['hydra:totalItems'])
                })
                .catch( (error) => console.log(console.error() ))   
    }, [invoices, search])

     // search with field: status { paid, sent..} 
     const handleSearch = ({currentTarget}) => {
        setSearch( currentTarget.value)
        setCurrentPage( 1 )
    }

    return (<> 
     <h1>Invoices list </h1>

    <div className="form-group">
            <input  className="form-control" 
                value={search}
                onChange={handleSearch}
                type="text" 
                name="search" 
                id="search"  
                placeholder="Search ... {state}" />
    </div>
    <table className="table table-hover">
        <thead>
            <tr>
            <th scope="col">Num</th>
            <th scope="col">Customer</th>
            <th scope="col">Date</th>
            <th scope="col">State</th>
            <th scope="col">Amount</th>
            <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            {invoices.map( (invoice) =>
                <tr key={invoice.id}>
                    <th scope="row">{invoice.chrono}</th>
                    <td>
                        <a href="">{invoice.customer.lastname} {invoice.customer.firstname}</a>
                    </td>
                    <td>{ moment(invoice.sentAt).format("DD/MM/YYYY") }</td>
                    <td>
                        <span className={"badge bg-"+Status_CLasses[invoice.status]}>
                            {invoice.status}
                        </span>
                    </td>
                    <td>{invoice.amount.toLocaleString()}  {Currencies.currency()}</td>
                    <td>               
                        <button className="btn btn-sm btn-primary mx-2">Edit</button>
                        <button 
                        disabled={ invoice.status !== "CANCELLED"}
                        className="btn btn-sm btn-danger">
                            Archived
                        </button>
                    </td>
                </tr>
            )}
           
        </tbody>
    </table>
    {
        totalItems>countItems
         && 
        <Pagination 
            currentPage={currentPage}  
            length={totalItems}
            countItems={countItems}
            onHandlePageChange={handlePageChange}
        /> 
    } 
    </>);
}
 
export default InvoicePagination;