import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Signup from './components/auth/signup';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';

import Admin from './components/session/admin';
import Root from './components/session/admin/root';
import Additem from './components/session/admin/additem';

import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <Route path='/signup' component={Signup} />
        <Route path='/signin' component={Signin} />
        <Route path='/signout' component={Signout} />
        <Route path='/admin' component={RequireAuth(Admin)}>
          <Route path='/admin/root' component={RequireAuth(Root)} />
          <Route path='/admin/additem' component={RequireAuth(Additem)} />
        </Route>
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
