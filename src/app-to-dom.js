import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {compose, createStore, applyMiddleware} from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';


import Signin from './components/authentication/signin';
import Signup from './components/authentication/signup';
import Home from './components/home/home';
import AppBase from './components/app-base';
import CityAdd from './components/city-list/city-add';
import AuthHoc from './components/authentication/auth-hoc';


import {AUTH_USER} from './actions/action-types';

import reducers from './reducers/combined-reducers';

function configureStore(initialState) {
  const store = createStore(reducers, initialState, compose(
    applyMiddleware(reduxThunk),
    window.devToolsExtension && window.devToolsExtension()
  ));
  return store;
}

const store = configureStore({});

//
// const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
// const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
//if we have a token, consider the user signed in.
if (token) {
  store.dispatch({type: AUTH_USER});
}


//todo - this is not the place to handle the authentication...
//need to manage it as an actual component....

ReactDOM.render(
  <Provider store={store}>

    <Router history={browserHistory}>
      <Route path="/" component={Signin}/>
      <Route path="signup" component={Signup}/>
      <Route path="app" component={AuthHoc(AppBase)}>
        <IndexRoute component={AuthHoc(Home)}/>
        <Route path="add" component={AuthHoc(CityAdd)}/>
      </Route>
    </Router>

  </Provider>
  , document.querySelector('.container'));
