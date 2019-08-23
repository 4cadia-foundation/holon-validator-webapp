import { combineReducers } from 'redux';

import validations from './validations';
import validator from './validator';
import navigation from './navigation';
import wallet from './wallet';

export default combineReducers({
  validations,
  validator,
  navigation,
  wallet
});
