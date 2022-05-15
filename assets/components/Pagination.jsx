import React from 'react'

const Pagination = ({currentPage, length, countItems, onHandlePageChange}) => {

    let pages = [];
    let countPages =  Math.ceil( length / countItems );
    for (let index = 1; index <= countPages; index++) {
        pages.push( index);
    }

    return (
        <div>
            <ul className="pagination pagination-lg mt-4">
                <li className={"page-item "+ ( currentPage == 1 && "disabled") }>
                <button className="page-link"  onClick={() => onHandlePageChange(currentPage-1)}>
                    &laquo;</button>
                </li>

                { pages.map( (page) => 
                    <li key={page} className={"page-item" + (page === currentPage && " active") }>
                    <button className="page-link"
                        onClick={() => onHandlePageChange(page)}>
                        {page}
                    </button>
                    </li>
                )}
                
                <li className={"page-item "+ ( currentPage == countPages && "disabled") }>
                <button className="page-link" onClick={() => onHandlePageChange(currentPage+1)}>
                    &raquo;</button>
                </li>
            </ul>
        </div>
    );
}

Pagination.sliceData = (items, paging) => {
    
   //console.log( items, paging);
   let start = paging.page * paging.limit - paging.limit;
   if( start < 0) start = 0;
   return items.slice(start, start+paging.limit);
}
 
export default Pagination;