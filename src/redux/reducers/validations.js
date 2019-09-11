const INITIAL_STATE = {
    publicKey: "",
    activeValidation: null,
    objLogs: {},
    error: '',
};
  
export default function validations(state = INITIAL_STATE, action) {
    switch(action.type){
        case 'SET_VALIDATION_ACTIVE':
           return {...state, activeValidation: action.activeValidation}
        break;
        case 'RESET_VALIDATION_ACTIVE':
           return {...state, activeValidation: null}
        break;
        case 'SET_VALIDATION_LIST':
          console.log('reducer/SET_VALIDATION_LIST/objLogs', action.objLogs)
          return {...state, objLogs: action.objLogs}
        break;
        case 'SET_PUBLIC_KEY':
            return {...state, publicKey: action.publicKey}
        break;
        case 'RESET_ERROR':
            return {...state, error: ''}
        break;
        case 'ERROR_VALIDATION_DATA':
            return {...state, error: action.error}
        break;
        case 'CLEAN_LOGOUT':
            console.log('------------')
            return {...INITIAL_STATE }
        break;
        default:
            return state;
    };
}