import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import validations from './validations';
import validator from './validator';
import navigation from './navigation';
import wallet from './wallet';

export default history => combineReducers({
  validations,
  validator,
  navigation,
  wallet,
  router: connectRouter(history),
});
