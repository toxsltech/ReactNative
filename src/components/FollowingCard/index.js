/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import FollowingCard from "./FollowingCard";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { onGetProfile } from '../../modules/GetProfile';
import { onFollow } from '../../modules/Follow';

import { onUnFollow } from '../../modules/UnFollow'

const mapStateToProps = state => ({

    isBusyProfile: state.GetProfileReducer.isBusy,
    getprofileResponse: state.GetProfileReducer.response,
    isBusyUnFollow: state.UnFollowReducer.isBusy,
    unfollowResponse: state.UnFollowReducer.response,
    isBusyFollow: state.FollowReducer.isBusy,
    followResponse: state.FollowReducer.response,

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
)(FollowingCard);

