
import React from 'react';
import ReactDom from 'react-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { HashRouter, Switch , Route} from 'react-router-dom';

import './styles/app.css';
import Customer from './pages/Customer';

const App = () =>{
    return (
    <HashRouter>
        <Navbar />
        <main class="container pt-5">
           <Switch>
             <Route path="/customers" component={Customer} />
             <Route path="/" component={Home} />
           </Switch>
        </main>
    </HashRouter>
    );
}

const el = document.querySelector('#app');
ReactDom.render(<App />, el)


