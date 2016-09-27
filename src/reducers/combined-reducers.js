import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import auth from './auth-reducer';
import cities from './cities-reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth,
  cities
});

export default rootReducer;
