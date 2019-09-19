import React from 'react';
import ReactDOM from 'react-dom';
import UserForm from "./components/Form";

import "./App.css";

function App () {
    return (
        <div className="App">
            <UserForm />
        </div>
    )
}

const rootElement = document.getElementById ("root");
ReactDOM.render(<App />, rootElement);