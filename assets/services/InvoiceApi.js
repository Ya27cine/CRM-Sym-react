import axios from 'axios'


const findAll = async  (countItems, currentPage, search) => {
   return await
        axios
            .get("https://localhost:8000/api/invoices?pagination=true&count="+countItems
                 +"&page="+currentPage+"&status="+search)
}

const post = (invoice) => {
    invoice = invoice.customer ? { ...invoice, customer: "/api/customers/"+invoice.customer} : invoice;
    return  axios
            .post("https://localhost:8000/api/invoices", invoice);
}

const put = (id, invoice) => {
    invoice = invoice.customer ? { ...invoice, customer: "/api/customers/"+invoice.customer} : invoice;
    return axios
            .put("https://localhost:8000/api/invoices/"+id, invoice);
}

export default{
    findAll,
    post,
    put
}