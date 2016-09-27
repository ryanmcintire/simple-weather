import * as actionTypes from '../actions/action-types';

export default function(state = {}, action) {
  switch(action.type) {
    case actionTypes.AUTH_USER:
      return {...state, userAuthenticated: true};
    case actionTypes.UNAUTH_USER:
      return {...state, userAuthenticated: false};
    case actionTypes.AUTH_ERR:
      return {...state, error: action.payload};
    case actionTypes.FETCH_MSG:
      return {...state, message: action.payload};
  }
  return state;
}
