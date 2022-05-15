import axios from 'axios'
import React, {useEffect, useState} from 'react'
import moment from 'moment';
import Currencies from './../services/Currencies'

const InvoicePagination = () => {

    const [invoices, setInvoices] = useState([])

    const Status_CLasses = {
        'CANCELLED': 'warning',
        'SENT': 'dark',
        'PAID': 'success',
    }

    useEffect(() => {   
        axios
            .get("http://localhost:8000/api/invoices")
                .then( (res) =>  setInvoices( res.data['hydra:member']) )
                .catch( (error) => console.log(console.error() ))   
    }, [invoices])

    return (<> 
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
                    <td>
                        <button className="btn btn-sm btn-primary mx-2">Edit</button>
                        <button 
                        disabled={ invoice.status !== "CANCELLED"}
                        className="btn btn-sm btn-danger">
                            Archived
                        </button>
                        </td>
                    </td>
                </tr>
            )}
           
        </tbody>
    </table>
    </>);
}
 
export default InvoicePagination;