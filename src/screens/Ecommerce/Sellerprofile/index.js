
/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import Sellerprofile from "./Sellerprofile";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {sellerProfile} from '../../../modules/Addsellerprofile'

const mapStateToProps = state => ({
    isBusySeller: state.SellerReducer.isBusy,
    SellerResponse: state.SellerReducer.response,

});

export default connect(
    mapStateToProps,
    dispatch => {
        return {
            sellerProfile: bindActionCreators(sellerProfile, dispatch),
        };
    }
)(Sellerprofile);
