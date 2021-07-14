/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import MobileNumber from "./MobileNumber";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { onRegister } from '../../../modules/Register'
import { onGetProfile } from '../../../modules/GetProfile'

const mapStateToProps = state => ({
    isBusy: state.RegisterReducer.isBusy,
    registerResponse: state.RegisterReducer.response,

    isBusyProfile: state.GetProfileReducer.isBusy,
    getprofileResponse: state.GetProfileReducer.response,
});

export default connect(
    mapStateToProps,
    dispatch => {
        return {
            onRegister: bindActionCreators(onRegister, dispatch),
            onGetProfile: bindActionCreators(onGetProfile, dispatch),
        };
    }
)(MobileNumber);

