//export const URL_HOST = "https://localhost:8000/api/"
export const URL_HOST = process.env.API_URL

/**
 *  ALL Urls :
 */
export const URLS = {
    URL_CUSTOMERS  :  "customers",
    URL_INVOICES   :  "invoices",
    URL_USERS      :  "users",
    URL_LOGIN      :  "login_check",
}

/**
 *  ALL Paths :
 */
export const PATHS = {
    PATH_MAIN      : "/",
    PATH_INVOICES  : "/invoices", 
    PATH_CUSTOMERS : "/customers",      
    PATH_REGISTER  : "/register" ,     
    PATH_LOGIN     : "/login"   
}
      
