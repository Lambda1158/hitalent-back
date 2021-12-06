import { types } from "../types";

const initialState = {
    uid: null,
    displayName: null,
};

export const authReducer = (state = initialState, action) => {
    switch(action.type){
        case types.LOGIN:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName,
            }
        case types.BASIC_AUTH:
            return {
                uid: null,
                displayName: action.payload.name,
                JWT: action.payload.JWT,
            };
        case types.LOGOUT:
            return initialState;
            
        default: return state
    }
}