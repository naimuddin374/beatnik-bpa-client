import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './store';
import { SET_USER } from './store/actions/types';
import { BrowserRouter } from 'react-router-dom';
import History from './util/History'

let authUser = localStorage.getItem('auth_user')
if (authUser) {
    store.dispatch({
        type: SET_USER,
        payload: JSON.parse(authUser)
    })
}

ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
        <App history={History} />
    </BrowserRouter>
</Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
