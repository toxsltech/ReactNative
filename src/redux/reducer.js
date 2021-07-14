/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import { Map, fromJS } from 'immutable';
import { loop, combineReducers } from 'redux-loop-symbol-ponyfill';
import { AuthReducer } from '../modules/Auth'

const reducers = {
    auth: AuthReducer
}

const immutableStateContainer = Map();
const getImmutable = (child, key) => (child ?
    child.get(key) : void 0);

const setImmutable = (child, key, value) => child.set(key, value);

const namespacedReducer = combineReducers(
    reducers,
    immutableStateContainer,
    getImmutable,
    setImmutable
);

export default function mainReducer(state, action) {
    const [nextState, effects] = action.type === 'session/RESET' ? namespacedReducer(action.payload, action) : namespacedReducer(state || void 0, action);
    return loop(fromJS(nextState), effects);
}



