import React from 'react'

const Navbar = () => {
    return ( 

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Gestion Client</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
        
            <div className="collapse navbar-collapse" id="navbarColor02">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#">Customers</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Invoices</a>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#">Register</a>
                </li>
                <li className="nav-item">
                  <a className="btn btn-success" href="#">Login</a>
                </li>
                <li className="nav-item">
                  <a className="btn btn-danger" href="#">Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>   
         );
}
 
export default Navbar;