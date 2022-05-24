import React ,{useState} from 'react';
import ReactDom from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import CustomerPagination from './pages/CustomerPagination';
import Home from './pages/Home';
import InvoicePagination from './pages/InvoicePagination';
import Login from './pages/security/Login';
import AuthApi from './services/AuthApi';
import './styles/app.css';


AuthApi.setup();

const App = () =>{

  const [isAuthenticated, setIsAuthenticated] = useState(false)


    return (
    <HashRouter>
        <Navbar  onLogout={setIsAuthenticated}  isAuthenticated={isAuthenticated} />
        <main className="container pt-5">
           <Switch>
             <Route path="/customers" component={CustomerPagination} />
             <Route path="/invoices" component={InvoicePagination} />

             <Route path="/login" 
                render={ (props) => <Login onLogin={setIsAuthenticated}  />  } 
             />

             <Route path="/" component={Home} />
           </Switch>
        </main>
    </HashRouter>
    );
}

const el = document.querySelector('#app');
ReactDom.render(<App />, el)


