import axios from 'axios'


const findAll = async  (countItems, currentPage, search) => {
   return await
        axios
            .get("http://localhost:8000/api/invoices?pagination=true&count="+countItems
                 +"&page="+currentPage+"&status="+search)
}

export default{
    findAll
}