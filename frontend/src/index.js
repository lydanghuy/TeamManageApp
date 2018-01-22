import React from 'react';
import ReactDOM from 'react-dom';
import './App/index.css';
import App from './App/App';
import {BrowserRouter} from 'react-router-dom';
import registerServiceWorker from './App/registerServiceWorker';

ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('root'))
registerServiceWorker();
