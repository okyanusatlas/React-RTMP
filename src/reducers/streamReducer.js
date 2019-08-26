import {mapKeys} from 'lodash';
const INITIAL_STATE = {};


export default (state = INITIAL_STATE, action) => {
    if (['FETCH_STREAM', 'CREATE_STREAM', 'EDIT_STREAM'].includes(action.type)) {
        return {...state, [action.payload.id]: action.payload}
    } else if (action.type === 'DELETE_STREAM') {
        const {[action.payload.id]: omitted, ...rest} = state;
        return rest;
    } else if (action.type === 'FETCH_STREAMS') {
        return {...state, ...mapKeys(action.payload, "id")};
    }
    return state;
};