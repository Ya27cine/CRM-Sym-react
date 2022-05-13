
import React from 'react';
import ReactDom from 'react-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Customer from './pages/Customer';
import CustomerPagination from './pages/CustomerPagination';

import { HashRouter, Switch , Route} from 'react-router-dom';

import './styles/app.css';

const App = () =>{
    return (
    <HashRouter>
        <Navbar />
        <main className="container pt-5">
           <Switch>
             <Route path="/customers" component={CustomerPagination} />
             <Route path="/" component={Home} />
           </Switch>
        </main>
    </HashRouter>
    );
}

const el = document.querySelector('#app');
ReactDom.render(<App />, el)


