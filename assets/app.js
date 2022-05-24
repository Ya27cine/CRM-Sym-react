import React ,{useState} from 'react';
import ReactDom from 'react-dom';
import { HashRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import CustomerPagination from './pages/CustomerPagination';
import Home from './pages/Home';
import InvoicePagination from './pages/InvoicePagination';
import Login from './pages/security/Login';
import AuthApi from './services/AuthApi';
import './styles/app.css';

const PrivateRoute = ({path, component, isAuthenticated}) => {
  return isAuthenticated 
         ? <Route path={path} component={component} /> 
         : <Redirect to="/login" /> 
}
 
const App = () =>{

  // Transform NavBar component to NavbarWithRouter for has 'history' attribute.
  const NavbarWithRouter  = withRouter( Navbar ) 

  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthApi.setup()
  )

  return (
    <HashRouter>
        <NavbarWithRouter  onLogout={setIsAuthenticated}  isAuthenticated={isAuthenticated} />
        <main className="container pt-5">
           <Switch>
            <PrivateRoute path="/customers" isAuthenticated={isAuthenticated} component={CustomerPagination} /> 
            <PrivateRoute path="/invoices"  isAuthenticated={isAuthenticated} component={InvoicePagination}  /> 
            <Route path="/login" 
                render={ (props) => <Login onLogin={setIsAuthenticated}  {...props /** Pass history attr for redirect */} />  } 
             />
             <Route path="/" component={Home} />
           </Switch>
        </main>
    </HashRouter>
    );
}

const el = document.querySelector('#app');
ReactDom.render(<App />, el)


