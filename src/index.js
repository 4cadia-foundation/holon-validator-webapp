import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store, { history } from './redux/store';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';

import {ToastContainer} from "react-toastify";
import { HashRouter  } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

ReactDOM.render(
  <Provider store={store}>

    <ToastContainer position={'top-center'} />

    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>

  </Provider>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
