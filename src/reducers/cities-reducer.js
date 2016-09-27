import * as actionTypes from '../actions/action-types';

export default function(state={}, action) {
  switch(action.type) {
    case actionTypes.FETCH_CITY_WEATHER:
      return {cities: action.payload, ...state };
    case actionTypes.SEARCH_CITY:
      return {searchResults: action.payload, ...state};
  }
  return state;
}
