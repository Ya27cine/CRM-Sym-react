import Http from './Http'

const findAll = async (countItems='All', currentPage=1, search='') => {
    let data;
    if(countItems != 'All'){
        await Http
        .get("customers?pagination=true&count="+countItems+"&page="+currentPage+"&firstname="+search)
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
        await Http.get("customers")
            .then( (res)   => {
                    data =  res.data['hydra:member']        
                })
            .catch( (er)  => console.error(er) )
        return data;
    }
    
}

const find =  (id) => {
   return Http.get("customers/"+id)
              .then((rep) => rep.data)
}

const put = (id, customer) => {
    return Http.put("customers/"+id, customer);
}

const post = (customer) => {
    return  Http.post("customers", customer);
}

const deleteCustomer = (id) => {
   return Http.delete("customers/"+id)
}


export default {
 findAll,
 delete: deleteCustomer,
 find,
 post,
 put
};
