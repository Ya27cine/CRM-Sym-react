import axios from 'axios'


const findAll = async  (countItems, currentPage, search) => {
   return await
        axios
            .get("https://localhost:8000/api/invoices?pagination=true&count="+countItems
                 +"&page="+currentPage+"&status="+search)
}

const post = (invoice) => {
    return  axios
            .post("https://localhost:8000/api/invoices", { ...invoice, customer: "/api/customers/"+invoice.customer});
}

const put = (id, invoice) => {
    return axios
            .put("https://localhost:8000/api/invoices/"+id, { ...invoice, customer: "/api/customers/"+invoice.customer});
}

export default{
    findAll,
    post,
    put
}