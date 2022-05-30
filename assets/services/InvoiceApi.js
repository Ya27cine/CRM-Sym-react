import { URLS } from '../config'
import Http from './Http'


const findAll = async  (countItems, currentPage, search) => {
   return await
        Http.get( URLS.URL_INVOICES + "?pagination=true&count="+countItems
                 +"&page="+currentPage+"&status="+search)
}

/**
  *  get one invoice
  */
const find =  (id) => {
    return Http.get( URLS.URL_INVOICES + "/" + id)
               .then((rep) => rep.data)
 }

 /**
  *  Add invoice
  */
const post = (invoice) => {
    invoice = invoice.customer ? { ...invoice, ...setInvoiceCustomer(invoice.customer) } : invoice;
    return  Http.post( URLS.URL_INVOICES, invoice);
}


/**
  *  update invoice
  */
const put = (id, invoice) => {
    invoice = invoice.customer ? { ...invoice, ...setInvoiceCustomer(invoice.customer) }  : invoice;

    return Http.put( URLS.URL_INVOICES + "/" + id, invoice);
}


/**
 * Convert id to url path
 *  e.g : invoice.customer = 17 (id)  :== TO ==> /api/customers/17
 */
const setInvoiceCustomer = (id) =>  { return  {customer: "/api/customers/"+id } }


export default{
    findAll,
    post,
    put,
    find
}