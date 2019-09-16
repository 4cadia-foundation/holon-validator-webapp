import { push } from 'connected-react-router'
import * as ActionTypes from '../../constants/actionsTypes';


export function resetLogout() {
    return dispatch => {
        console.log('----------')
        dispatch([
            {type: 'RESET_WALLET', wallet: ActionTypes.RESET_WALLET.INITIAL_STATE},
            {type: 'LOGOUT'},
            {type: 'CLEAN_LOGOUT'},
            {type: 'RESET_VALIDATOR'},
            {type: 'RESET_WALLET'},
            push('/welcomeback')
        ]);
    }
}