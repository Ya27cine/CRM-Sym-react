
import React from 'react';
import ReactDom from 'react-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

import './styles/app.css';

const App = () =>{
    return (
    <div>
        <Navbar />
        <div class="container pt-5">
          <Home/>
        </div>
    </div>
    );
}

const el = document.querySelector('#app');
ReactDom.render(<App />, el)


