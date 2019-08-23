import FilterEventsBlockchain from '../../scripts/core/FilterEventsBlockchain';
import store from '../store';
import { ethers } from 'ethers';
import { buildToast, ToastTypes } from '../../helper/toast';

export function toggleDocuments (module, doc){
    return {
        type: 'SET_MODULE_ACTIVE',
        module, doc
      }
}

export function defineActiveValidation(validation) {
    return (dispatch) => {
        dispatch({type: 'SET_VALIDATION_ACTIVE', activeValidation: validation,
        });
    }
}

export function resetActiveValidation() {
    return (dispatch) => {
        dispatch({type: 'RESET_VALIDATION_ACTIVE',
        });
    }
}

export function setValidations() {
    const objLogs = store.getState().validator.objLogs;
    console.log('action/validation/setValidations/objLogs', objLogs)
    return (dispatch) => {
        dispatch({type: 'SET_VALIDATION_LIST', objLogs: objLogs});
    }
}

export function publicKey() {

    const filter = {};
    filter.fromBlock = 4664439;
    filter.toBlock = 'latest';
    filter.topics = [ '0x1456b31d407e7c26146bc3a52f821b249e30d8c118995dcf93a95543e3fd8bcf' ];

    
    return async (dispatch) => {
        try {

            const filterEventsBlockchain = new FilterEventsBlockchain(filter);
            await filterEventsBlockchain.filterInitialization();
            
            filterEventsBlockchain.getSenderPublicKey("0xc3d8DFCA4b2387D1d0Bf8A7C4D7B361a26863AAC")
            .then(publicKey => {
                dispatch({type: 'SET_PUBLIC_KEY', publicKey: publicKey.toString('hex')});
            });
            
        } catch (exception) {
            dispatch({type: 'ERROR_PUBLIC_KEY', error: exception.message,
            toast: buildToast('Error, yout public key not found!', {type: ToastTypes.ERROR})
        });
        }
       
    }
  }

export function submitValidation(requester, field, optionChosen) {
    console.log('validation/submitValidation/starting');
    return async (dispatch) => {
        //
        try {
            const contract = store.getState().validations.objLogs.transactor.contract;
            const filterContract = store.getState().validations.objLogs;
            let txParams = {
                gasLimit: 3000000,
                gasPrice: ethers.utils.parseUnits('9.0', 'gwei'),            
                value: 0,  
            };
            console.log('validation/submitValidation/params', requester, field, optionChosen, txParams);
            let tx = await contract.validate(requester, field, optionChosen, txParams);
            console.log('validation/submitValidation/tx', tx);
            if (tx) {
                let receipt = await tx.wait(1);
                console.log('validation/submitValidation/receipt', receipt);
                if (receipt.status === 1) {
                    dispatch({ type: 'RESET_VALIDATION_ACTIVE'})
                    dispatch({
                        type: 'TOASTY_SUCCESS',
                        toast: buildToast('Success your validation has been computed', {type: ToastTypes.SUCCESS})
                    })
                    dispatch({ type: 'RESET_ERROR'});  
                    console.log('validation/submitValidation/loadValidateMeLogs/loading');
                    let numValidatRequests = await filterContract.loadValidateMeLogs();
                    console.log('validation/submitValidation/loadValidateMeLogs/numValidatRequests', numValidatRequests);
                    let numValidatResults = await filterContract.loadValidateResultLogs();
                    console.log('validation/submitValidation/loadValidateMeLogs/numValidatResults', numValidatResults);   
                    filterContract.updateValidationAsks();
                    console.log('validation/submitValidation/loadValidateMeLogs/updateValidationAsks');                   
                    dispatch({ type: 'SET_VALIDATION_LIST', objLogs: filterContract})
                } else {
                    dispatch({ type: 'ERROR_VALIDATION_DATA', error: 'validation/submitValidation: Error on processing the transaction to validate data',
                    toast: buildToast('Error, on processing the transaction to validate data!', {type: ToastTypes.ERROR})
                });
                }
            } else {
                dispatch({ type: 'ERROR_VALIDATION_DATA', error: 'validation/submitValidation: Error to submit the transaction to validate data', 
                toast: buildToast('Error, to submit the transaction to validate data !', {type: ToastTypes.ERROR})
            });
            }
        } catch (exception) {
            console.error('validation/submitValidation/exception', exception);
            dispatch({ type: 'ERROR_VALIDATION_DATA', error: exception.message})
            dispatch({
                type: 'TOASTY_ERROR',
                toast: buildToast('Could not processing your validation', {type: ToastTypes.ERROR})
            })
        }
    }
}

  