import axios from 'axios'

const findAll = async (countItems, currentPage, search) => {
    let data;
    await axios
    .get("https://localhost:8000/api/customers?pagination=true&count="+countItems+"&page="+currentPage+"&firstname="+search)
    .then( (res)   => 
        {
            data = {
                    customers:  res.data['hydra:member'],
                    totalItems: res.data['hydra:totalItems']
                }
        })
    .catch( (er)  => console.error(er) )
    return data;
}

const deleteCustomer = (id) => {
   return axios.delete("/api/customers/"+id)
}


export default {
 findAll,
 delete: deleteCustomer
};





// axios
//          .get("http://localhost:8000/api/customers?pagination=true&count="+countItmes+"&page="+currentPage+"&firstname="+search)
//          .then( (res)   => {
//              setCustomers( res.data['hydra:member'] )
//              setTotalItems( res.data['hydra:totalItems'] );
//          })
//          .catch( (er)  => console.error(er) )