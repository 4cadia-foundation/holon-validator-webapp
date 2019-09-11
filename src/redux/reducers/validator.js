const INITIAL_STATE = {
    address: "",
    error: "",
    personalInfo: [],    
    balance: 0,
    isHolonValidator: false,
    isRunning: false,
    objLogs: null,
    numberOfValidations: 0,
    numberOfFields: 0,
}

export default function validator (state = INITIAL_STATE, action) {

    if (action.type == 'GET_VALIDATOR_BASIC_DATA') {    
        //console.log('reducer GET_VALIDATOR_BASIC_DATA state', state)
        return {...state, objLogs: action.objLogs, personalInfo: action.personalInfo, address: action.address, isHolonValidator: action.isHolonValidator, isRunning: false }
    }

    if (action.type == 'GET_VALIDATOR_SCORE') {    
        return {...state, numberOfValidations: action.numberOfValidations}
    }


    if (action.type == 'READ_ALL_VALIDATOR_LOGS') {
        // console.log('reducer/READ_ALL_PERSONA_LOGS')
        return {...state, readAllPersonaLogs: true}
    }

    if (action.type == 'WILL_READ_ALL_VALIDATOR_LOGS') {
        // console.log('reducer/WILL_READ_ALL_PERSONA_LOGS')
        return {...state, readAllPersonaLogs: false}
    }
    
    if (action.type == 'RUNNING_METHOD') {
        // console.log('reducer/RUNNING_METHOD')
        return {...state, isRunning: true}
    }

    if (action.type == 'METHOD_EXECUTED') {
        // console.log('reducer/METHOD_EXECUTED')
        return {...state, isRunning: false}
    }

    if (action.type == 'GET_BALANCE') {
        return {...state, balance: action.balance}
    }
    
    if (action.type == 'GET_VALIDATOR_DATA') {
        return{...state, personalInfo: action.novoPersonalInfo}
    }
    
    if (action.type == 'GET_VALIDATOR_ADDRESS') {
        return { ...state, address: action.address }
    }

    if (action.type == 'CLEAR_ERROR') {
        return { ...state, error: '' };
    }
    
    if (action.type == 'ERROR_VALIDATOR_DATA') {
        return { ...state, error: action.error, isRunning: false };
    }

    if(action.type == 'RESET_VALIDATOR'){
        return { ...INITIAL_STATE };
    }
    return state;
}