import Http from './Http'


const findAll = async  (countItems, currentPage, search) => {
   return await
        Http.get("invoices?pagination=true&count="+countItems
                 +"&page="+currentPage+"&status="+search)
}

/**
  *  get one invoice
  */
const find =  (id) => {
    return Http.get("invoices/"+id)
               .then((rep) => rep.data)
 }

 /**
  *  Add invoice
  */
const post = (invoice) => {
    invoice = invoice.customer ? { ...invoice, ...setInvoiceCustomer(invoice.customer) } : invoice;
    return  Http.post("invoices", invoice);
}


/**
  *  update invoice
  */
const put = (id, invoice) => {
    invoice = invoice.customer ? { ...invoice, ...setInvoiceCustomer(invoice.customer) }  : invoice;

    return Http.put("invoices/"+id, invoice);
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