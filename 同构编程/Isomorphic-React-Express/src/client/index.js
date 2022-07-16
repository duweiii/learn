import './index.css';
import React from 'react';
import ReactDOM,{ hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'isomorphic/store';
import App from 'isomorphic/App';

hydrate(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('app')
);