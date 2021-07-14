/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import ViewersCard from "./ViewersCard";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { onGetProfile } from '../../modules/GetProfile';
import { onUnFollow } from '../../modules/UnFollow'
import { onFollow } from '../../modules/Follow'

const mapStateToProps = state => ({

    isBusyProfile: state.GetProfileReducer.isBusy,
    getprofileResponse: state.GetProfileReducer.response,

    isBusyFollow: state.FollowReducer.isBusy,
    followResponse: state.FollowReducer.response,

    isBusyUnFollow: state.UnFollowReducer.isBusy,
    unfollowResponse: state.UnFollowReducer.response,

});

export default connect(
    mapStateToProps,
    dispatch => {
        return {
            onGetProfile: bindActionCreators(onGetProfile, dispatch),
            onUnFollow: bindActionCreators(onUnFollow, dispatch),
            onFollow: bindActionCreators(onFollow, dispatch),

        };
    }
)(ViewersCard);

