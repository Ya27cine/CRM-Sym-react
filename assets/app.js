
import React from 'react'
import ReactDom from 'react-dom'
const App = () =>{
    return <h1>Hello, everybody !</h1>;
}

const el = document.querySelector('#app');
ReactDom.render(<App />, el)


