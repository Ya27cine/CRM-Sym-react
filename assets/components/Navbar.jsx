import React, {useContext, useState} from 'react'
import { NavLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import AuthApi from '../services/AuthApi';
import { toast } from 'react-toastify';
import AlertDialog from './AlertDialog/AlertDialog';
import ConfigDrawer from './drawer/ConfigDrawer';
import { FaGithub } from 'react-icons/fa';

const Navbar = ({ history }) => {
 
  const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext)
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const link_source_code = "https://github.com/Ya27cine/CRM-Sym-react";

  const handleLogout = () => {
    AuthApi.logout() // delete token
    setIsAuthenticated( true )

     // notify
     toast.success("Logout success ! ", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1270
    });

    history.push("/login") // redirection
  }

  const handleNavCollapsed = () => {
    setIsNavCollapsed( ! isNavCollapsed )
  }

  return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">Gestion Client</NavLink>

            <button className="navbar-toggler" onClick={handleNavCollapsed}  
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarColor02" 
                    aria-controls="navbarColor02" 
                    aria-expanded={isNavCollapsed ? true : false}
                    aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
        
            <div className={ (isNavCollapsed &&  'collapse') + " navbar-collapse"} id="navbarColor02">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/customers">Customers</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/invoices">Invoices</NavLink>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">       
                <li className="nav-item mx-4">
                    <a className="btn btn-success" href={link_source_code}>
                       <FaGithub /> source code
                    </a>                    
                  </li>    

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
                      {/* <button 
                        className="btn btn-danger"
                        onClick={handleLogout} 
                      >Logout</button> */}
                      <AlertDialog text="logout" color="error"  onLogout={handleLogout} />
                   </li>
                   <li className="nav-item">
                    <ConfigDrawer />
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