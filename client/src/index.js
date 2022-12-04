import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import 'react-toastify/dist/ReactToastify.css';
import { HelmetProvider } from 'react-helmet-async';
ReactDOM.render(
    <HelmetProvider>
        <CookiesProvider>
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>
        </CookiesProvider>
    </HelmetProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
