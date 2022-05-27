import axios from 'axios'

const findAll = async (countItems='All', currentPage=1, search='') => {
    let data;
    if(countItems != 'All'){
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
    }else{
        await axios
        .get("https://localhost:8000/api/customers")
        .then( (res)   => {
                data =  res.data['hydra:member']        
            })
        .catch( (er)  => console.error(er) )
        return data;
    }
    
}

const find =  (id) => {
   return axios
            .get("https://localhost:8000/api/customers/"+id)
            .then((rep) => rep.data)
}

const put = (id, customer) => {
    return axios
            .put("https://localhost:8000/api/customers/"+id, customer);
}

const post = (customer) => {
    return  axios
            .post("https://localhost:8000/api/customers", customer);
}

const deleteCustomer = (id) => {
   return axios.delete("/api/customers/"+id)
}


export default {
 findAll,
 delete: deleteCustomer,
 find,
 post,
 put
};





// axios
//          .get("http://localhost:8000/api/customers?pagination=true&count="+countItmes+"&page="+currentPage+"&firstname="+search)
//          .then( (res)   => {
//              setCustomers( res.data['hydra:member'] )
//              setTotalItems( res.data['hydra:totalItems'] );
//          })
//          .catch( (er)  => console.error(er) )