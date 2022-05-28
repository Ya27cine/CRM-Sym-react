import React, {useContext} from 'react'
import { NavLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import AuthApi from '../services/AuthApi';

const Navbar = ({ history }) => {
 
  const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext)

  const handleLogout = () => {
    AuthApi.logout() // delete token
    setIsAuthenticated( false )
    history.push("/login") // redirection
  }

  return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">Gestion Client</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
        
            <div className="collapse navbar-collapse" id="navbarColor02">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/customers">Customers</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/invoices">Invoices</NavLink>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
               
               { ( ! isAuthenticated 
                  &&
                  <>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/register">Register</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="btn btn-success" to="/login">Login</NavLink>
                      </li>
                  </>
                  ||
                  <>
                   <li className="nav-item">
                      <button 
                        className="btn btn-danger"
                        onClick={handleLogout} 
                      >Logout</button>
                   </li>
                  </>    
                )}                                       
              </ul>
            </div>
          </div>
        </nav>   
         );
}
 
export default Navbar;