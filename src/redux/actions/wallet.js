import Wallet from '../../scripts/core/WalletStorage';
import * as ActionTypes from '../../constants/actionsTypes';
import { buildToast, ToastTypes } from '../../helper/toast';


const wallet = new Wallet();

export function restoreVault(password, seed) {
  return dispatch => {
    wallet.createNewVaultAndRestore(password, seed)
      .then((wallet) => {
        console.log('restoreVault/wallet restored');
        dispatch({
          type: ActionTypes.SET_ACCOUNTS,
          address: wallet.address,
          wallet: wallet,
          mnemonic: wallet.mnemonic,
        });
      })
      .catch(exception => {
        dispatch({
          type: ActionTypes.SET_ACCOUNTS_ERROR,
        });
      })
  }
}

export function hasWallet() {
  return dispatch => {
    wallet.getChromeStorage().then((content) => {
      if (!content) {
        dispatch({
          type: ActionTypes.HAS_WALLET,
          hasWallet: false
        });
        return;
      }
      dispatch({
        type: ActionTypes.HAS_WALLET,
        hasWallet: true
      });
    })
      .catch(exception => {
        dispatch({
          type: ActionTypes.SET_ACCOUNTS_ERROR
        });
      })
  }
}

export function openWallet(password) {
  console.log('openWallet/password', password.length);
  return (async (dispatch) => {
    try {
      dispatch({ type: ActionTypes.OPENING_WALLET });
      let walletResult = await wallet.submitPassword(password);
      dispatch({
        type: ActionTypes.SET_ACCOUNTS,
        address: walletResult.address,
        wallet: walletResult,
        mnemonic: walletResult.mnemonic,
      });
    } catch (error) {
      dispatch({ type: ActionTypes.OPEN_WALLET_ERROR, error: error });
      dispatch({
        type: 'TOASTY_ERROR',
        toast: buildToast('Password is incorrect!', { type: ToastTypes.ERROR })
      });
    }
  });
}

export function createNewWallet(password) {
  return dispatch => {
    console.log('actions/wallet/creating new wallet');
    wallet.createNewVault(password)
      .then((wallet) => {
        console.log('createNewWallet/wallet created');
        dispatch({
          type: ActionTypes.SET_ACCOUNTS,
          address: wallet.address,
          wallet: wallet,
          mnemonic: wallet.mnemonic,
        });
      })
      .catch((exception) => {
        console.log('actions/wallet/createNewWallet', exception);
        dispatch({
          type: ActionTypes.SET_ACCOUNTS_ERROR,
        });
      });
  }
}
