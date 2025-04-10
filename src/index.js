import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "../src/assets/styles/styles.scss"

import App from './App';
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {Provider} from "react-redux";

import reportWebVitals from './reportWebVitals';
import store from "./component/store/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App/>
        <ToastContainer/>
      </Provider>
    </BrowserRouter>
);

reportWebVitals();
