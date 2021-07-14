/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import OtherFeeds from "./OtherFeeds";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { onGetFeeds } from '../../../../modules/GetFeeds';
import { onGetProfile } from '../../../../modules/GetProfile'

import { onGetAllProfile } from '../../../../modules/GetAllProfile';

const mapStateToProps = state => ({
    isBusyFeed: state.GetFeedsReducer.isBusy,
    getfeedResponse: state.GetFeedsReducer.response,

    isBusyProfile: state.GetProfileReducer.isBusy,
    getprofileResponse: state.GetProfileReducer.response,

    isBusyAllProfile: state.GetAllProfileReducer.isBusy,
    getallprofileResponse: state.GetAllProfileReducer.response,

});

export default connect(
    mapStateToProps,
    dispatch => {
        return {
            onGetFeeds: bindActionCreators(onGetFeeds, dispatch),
            onGetProfile: bindActionCreators(onGetProfile, dispatch),
            onGetAllProfile: bindActionCreators(onGetAllProfile, dispatch),

        };
    }
)(OtherFeeds);

