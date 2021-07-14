/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import { createLogger } from "redux-logger";

export default createLogger({
    collapsed: true,
    predicate: () => __DEV__,
    stateTransformer: state => state,
    actionTransformer: action =>
        action && action.payload && action.payload ? { ...action, payload: action.payload } : action
});


