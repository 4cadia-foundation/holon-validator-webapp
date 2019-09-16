import { createStore, applyMiddleware, compose } from 'redux';
import multi from 'redux-multi';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducers';
import toastMiddleware from './middleware/toastMiddleware';

export const history = createBrowserHistory();

const store = createStore(
    createRootReducer(history),
    applyMiddleware(multi, thunk, toastMiddleware, routerMiddleware(history))
);


export default store;
