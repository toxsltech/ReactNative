/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import Profile from "./Profile";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { onGetProfile } from '../../../../modules/GetProfile'
import { Following } from '../../../../modules/Following'
import { onGetFeeds } from '../../../../modules/GetFeeds';

const mapStateToProps = state => ({
    isBusyProfile: state.GetProfileReducer.isBusy,
    getprofileResponse: state.GetProfileReducer.response,

    isBusyFollowing: state.GetFollowingReducer.isBusy,
    getfollowingResponse: state.GetFollowingReducer.response,

    isBusyFeed: state.GetFeedsReducer.isBusy,
    getfeedResponse: state.GetFeedsReducer.response,
});

export default connect(
    mapStateToProps,
    dispatch => {
        return {
            onGetProfile: bindActionCreators(onGetProfile, dispatch),
            Following: bindActionCreators(Following, dispatch),
            onGetFeeds: bindActionCreators(onGetFeeds, dispatch),
        };
    }
)(Profile);

