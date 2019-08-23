import * as ActionTypes from '../../constants/actionsTypes';

const INITIAL_STATE = {
  address: '',
  seed: '',
  mnemonic: '',
  openedWallet: false,
  hasWallet: false,
  error: '',
  ethersWallet: {}
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.SET_ACCOUNTS:
      return { ...state, error:'', ethersWallet: action.wallet, address: action.address, mnemonic: action.mnemonic, openedWallet: true };
      break;
    case ActionTypes.SET_WALLET_CREATE:
      return { ...state, accounts: action.accounts };
      break;
    case ActionTypes.SET_ACCOUNTS_ERROR:
      return { ...state, error: action.error };
      break;
    case ActionTypes.OPENING_WALLET:
      //console.log('ActionTypes.OPENING_WALLET');
      return { ...state, error: '', openedWallet: false };
      break;
    case ActionTypes.OPEN_WALLET_ERROR:
      //console.log('ActionTypes.OPEN_WALLET_ERROR',action.error.message);
      return { ...state, error: action.error.message, openedWallet: false };
      break;
    case ActionTypes.OPEN_WALLET:
      return { ...state, ethersWallet: action.wallet, address: action.address };
      break;
    case ActionTypes.HAS_WALLET:
      return { ...state, hasWallet: action.hasWallet };
      break;
    default:
      return state;
  }
}