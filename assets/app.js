import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { HashRouter, Route, Switch, withRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AuthContext from './context/AuthContext';
import CustomerPagination from './pages/customer/CustomerPagination';
import CustomerForm from './pages/customer/CustomerForm';
import Home from './pages/Home';
import InvoicePagination from './pages/invoice/InvoicePagination';
import Login from './pages/security/Login';
import AuthApi from './services/AuthApi';
import './styles/app.css';


// Load the JWT as soon as the React app starts
/** ===>  */  AuthApi.setup()
 
const App = () =>{
  // Transform NavBar component to NavbarWithRouter to have 'history' attribute.
  const NavbarWithRouter  = withRouter( Navbar ) 

  const [isAuthenticated, setIsAuthenticated] = useState( AuthApi.isAuthenticated() )
  return (
    <AuthContext.Provider 
      value={ {isAuthenticated, setIsAuthenticated} }>

        <HashRouter>
            <NavbarWithRouter  />
            <main className="container pt-5">
                <Switch>
                    <PrivateRoute  path="/customers/:id"  component={CustomerForm}       /> 
                    <PrivateRoute  path="/customers"      component={CustomerPagination} /> 
                    <PrivateRoute  path="/invoices"       component={InvoicePagination}  /> 
                    <Route         path="/login"          component={Login}              />
                    <Route         path="/"               component={Home}               />
                </Switch>
            </main>
        </HashRouter>

    </AuthContext.Provider>
    );
}
const el = document.querySelector('#app');
ReactDom.render(<App />, el)