import axios from 'axios';
import {browserHistory} from 'react-router';

import * as actionTypes from './action-types';

const ROOT_URL = 'http://localhost:3000';

export function signInUser({email, password}) {
  localStorage.removeItem('token');
  return function (dispatch) {

    axios.post(`${ROOT_URL}/users/signin`, {email, password})
      .then(response => {
        dispatch({type: actionTypes.AUTH_USER});
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/app');
      })
      .catch(() => {
        dispatch(authError('Incorrect username or password.'));
      });
  }
}

export function signOutUser() {
  localStorage.removeItem('token');
  return {
    type: actionTypes.UNAUTH_USER
  }
}

export function authError(error) {
  return {
    type: actionTypes.AUTH_ERR,
    payload: error
  };
}

export function signupUser({email, password}) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/users/signup`, {email, password})
      .then(response => {
        dispatch({type: actionTypes.AUTH_USER});
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/app')
      })
      .catch(response => dispatch(authError(response.data.error)));
  }
}


export function fetchCityWeather() {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/cities/city-data`, {
        headers: {Authorization: localStorage.getItem('token')}
      })
      .then(response => {
        dispatch({
          type: actionTypes.FETCH_CITY_WEATHER,
          payload: response.data
        })
      });
    // .catch(response => {
    //   console.log('were in error land.');
    //   console.log(response);
    // });
  };
}

export function citySearch(city) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/cities/search`, {
        city
      },
      {
        headers: {Authorization: localStorage.getItem('token')}
      })
      .then(response => {
        console.log(response.data);
        dispatch({
          type: actionTypes.SEARCH_CITY,
          payload: response.data
        })
      });
  }
}//todo - error handling.


