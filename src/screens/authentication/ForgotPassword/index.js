/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import ForgotPassword from "./ForgotPassword";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { OnForgotPassword } from '../../../modules/ForgotPass';

const mapStateToProps = state => ({
    isBusy: state.ForgotPassReducer.isBusy,
    forgotPassResponse: state.ForgotPassReducer.response
});

export default connect(
    mapStateToProps,
    dispatch => {
        return {
            OnForgotPassword: bindActionCreators(OnForgotPassword, dispatch),
        };
    }
)(ForgotPassword);

