import { combineReducers } from 'redux';


const initialState = {
	clientList:[]
}


const UPDATA_CLIENTS_INFO = 'UPDATA_CLIENTS_INFO';



export function updataClientInfo(msg) {
	return {
		type: UPDATA_CLIENTS_INFO,
		payload: msg 
	}
}


function client(state = initialState, action) {
	switch (action.type) {
		case UPDATA_CLIENTS_INFO:{
			return {
                ...state,
                clientList:action.payload
            }
		}
		default:
			return state;
	}
}


export default combineReducers({
    client,
});