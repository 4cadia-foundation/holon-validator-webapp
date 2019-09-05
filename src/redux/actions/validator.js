import { ethers } from 'ethers';
import Transactor from '../../scripts/core/Transactor';
import store from '../store';
import FilterValidatorEvents from '../../helper/FilterValidatorEvents';
import { buildToast, ToastTypes } from '../../helper/toast';


const transactor = new Transactor();
const filterContract = new FilterValidatorEvents();

function checkWallet() {
    console.log('action/validator/checkingWallet');
    //console.log('action/validator/checkWallet/globalState', store.getState());
    //console.log('action/validator/checkWallet/transactor.wallet', transactor.wallet);
    if (!transactor.wallet) {
        if (store.getState().wallet.ethersWallet) {
            transactor.wallet = store.getState().wallet.ethersWallet;
            // eslint-disable-next-line no-unused-expressions
            transactor.contractWithSigner;
            filterContract.transactor = transactor;
            console.log('action/persona/checkWallet/transactor.wallet-set', transactor);
            console.log('action/persona/checkWallet/filterContract transactor-set', filterContract);
            return true;
        } else {
            return false;
        }
    } else {
        // eslint-disable-next-line no-unused-expressions
        transactor.contractWithSigner;
        filterContract.transactor = transactor;
        return true;
    }
}

export function getBalance() {
    console.log('actions/getBalance/starting');
    if (!checkWallet()) {
        return (dispatch) => {
            dispatch({ type: 'ERROR_VALIDATOR_DATA', error: 'Wallet was not set' });
        }
    }
    return (async (dispatch) => {
        const balance = await transactor.wallet.getBalance();
        console.log('actions/getBalance', ethers.utils.formatEther(balance), balance);
        dispatch({ type: 'GET_BALANCE', balance: ethers.utils.formatEther(balance) });        
    });
}

export function getValidatorScore() {
    console.log('actions/getScore');
    if (!checkWallet()) {
        return (dispatch) => {
            dispatch({ type: 'ERROR_VALIDATOR_DATA', error: 'Wallet was not set' });
        }
    }
    return (async (dispatch) => {
        const validatorData = await transactor.contract.holonValidators(transactor.wallet.address);
        console.log('actions/getScore/getValidatorScore', validatorData);
        console.log('actions/getScore/getValidatorScore details/ numberOfValidations', parseInt(validatorData[1]));
        dispatch({ type: 'GET_VALIDATOR_SCORE', numberOfValidations: parseInt(validatorData[1]) });        
    });
}

export function getValidatorData() {
    console.log('actions/getValidatorData');
    if (!checkWallet()) {
        return (dispatch) => {
            dispatch({ type: 'ERROR_VALIDATOR_DATA', error: 'Wallet was not set' });
        }
    }
    return (async (dispatch) => {
        dispatch({ type: 'RUNNING_METHOD'}); 
        const validatorData = await transactor.contract.holonValidators(transactor.wallet.address);
        console.log('actions/getValidatorData/getValidatorData', validatorData);
        //console.log('actions/getValidatorData/getValidatorData/ details ', parseInt(score[1]), "numberOfFields", parseInt(score[0]));
        console.log('actions/getValidatorData/loadValidateMeLogs/loading');
        let numValidatRequests = await filterContract.loadValidateMeLogs();
        console.log('actions/getValidatorData/loadValidateMeLogs/numValidatRequests', numValidatRequests);
        let numValidatResults = await filterContract.loadValidateResultLogs();
        console.log('actions/getValidatorData/loadValidateResultLogs/numValidatResults', numValidatResults);   
        filterContract.updateValidationAsks();
        console.log('actions/getValidatorData/loadValidateMeLogs/updateValidationAsks');                  
        console.log('actions/getValidatorData/novoPersonalInfo/loading');
        let novoPersonalInfo = await transactor.getPersonalInfo([]);
        console.log('actions/getValidatorData/novoPersonalInfo', novoPersonalInfo);
        dispatch({ type: 'GET_VALIDATOR_BASIC_DATA', objLogs: filterContract, personalInfo: novoPersonalInfo, address: transactor.wallet.address, isHolonValidator: validatorData[4] });        
    });
}

export function addValidator(_priceStrategy, _price, dispatch) {
    if (!checkWallet()) {
        return (dispatch) => {
            dispatch({ type: 'ERROR_VALIDATOR_DATA', error: 'Wallet was not set',
            toast: buildToast('Error, wallet was not set!', {type: ToastTypes.ERROR})
            })
        }
    }
    console.log('validator/addValidator/starting');
    return async (dispatch) => {
        dispatch({ type: 'RUNNING_METHOD' });
        dispatch({ type: 'CLEAN_ERROR' });
        try {
            let txParams = {
                gasLimit: 3000000,
                value: ethers.utils.parseEther('1.0')  
            };
            console.log('actions/addValidator/params', _priceStrategy, _price, txParams);
            let tx = await transactor.contract.addValidator(_priceStrategy, _price, txParams);
            console.log('validator/addValidator/tx', tx);
            if (tx) {
                let receipt = await tx.wait(1);
                console.log('validator/addValidator/receipt', receipt);
                if (receipt.status === 1) {
                    let validationRequests = [];                    
                    console.log('validator/addValidator/novoPersonalInfo/loading');
                    let novoPersonalInfo = await transactor.getPersonalInfo(validationRequests);
                    console.log('validator/addValidator/personalInfo', novoPersonalInfo);
                    dispatch({ type: 'GET_VALIDATOR_BASIC_DATA', address: transactor.wallet.address, isHolonValidator: true, personalInfo: novoPersonalInfo})
                } else {
                    dispatch({ type: 'ERROR_VALIDATOR_DATA', error: 'askToValidate: Transaction on Blockchain has failed',
                    toast: buildToast('Error, Transaction on Blockchain has failed!', {type: ToastTypes.ERROR})
                    });
                }
            } else {
                dispatch({ type: 'ERROR_VALIDATOR_DATA', error: 'It was not possible to submit the validation request',
                toast: buildToast('Error, It was not possible to submit the validation request!', {type: ToastTypes.ERROR})
                });
            }
        } catch (exception) {
            console.error('actions/addValidator/exception', exception);
            return (dispatch) => {
                dispatch({ type: 'ERROR_VALIDATOR_DATA', error: exception.message,
                toast: buildToast('Error validator data!', {type: ToastTypes.ERROR})
            });
            }
        }
    }
}
