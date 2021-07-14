/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import ConfirmationCode from "./ConfirmationCode";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { onGetProfile } from '../../../modules/GetProfile'
import { onVerifyingOTP } from '../../../modules/VerifyOTP';

const mapStateToProps = state => ({
    isBusy: state.VerifyOTPReducer.isBusy,
    otpResponse: state.VerifyOTPReducer.response,

    isBusy: state.RegisterReducer.isBusy,
    registerResponse: state.RegisterReducer.response,

    isBusyProfile: state.GetProfileReducer.isBusy,
    getprofileResponse: state.GetProfileReducer.response,
});

export default connect(
    mapStateToProps,
    dispatch => {
        return {
            onVerifyingOTP: bindActionCreators(onVerifyingOTP, dispatch),
            onGetProfile: bindActionCreators(onGetProfile, dispatch),
        };
    }
)(ConfirmationCode);

