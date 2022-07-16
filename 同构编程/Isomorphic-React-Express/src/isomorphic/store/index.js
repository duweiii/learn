import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

const isBrowser = typeof window !== 'undefined';

let hydrationState = {};
if (isBrowser && window.__HYDRATION_STATE__) {
    hydrationState = window.__HYDRATION_STATE__;
    delete window.__HYDRATION_STATE__;
}

export default createStore(reducer, hydrationState,applyMiddleware(thunk));