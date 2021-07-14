/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import OtherProfile from "./OtherProfile";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { onGetOtherStory } from '../../../../modules/GetOtherStory';

import { onGetAllProfile } from '../../../../modules/GetAllProfile';
import { onFollow } from '../../../../modules/Follow';
import { onUnFollow } from '../../../../modules/UnFollow'

const mapStateToProps = state => ({

    isBusyAllProfile: state.GetAllProfileReducer.isBusy,
    getallprofileResponse: state.GetAllProfileReducer.response,

    isBusyotherStory: state.GetOtherStoryReducer.isBusy,
    getotherstoryResponse: state.GetOtherStoryReducer.response,

    isBusyFollow: state.FollowReducer.isBusy,
    followResponse: state.FollowReducer.response,
    isBusyUnFollow: state.UnFollowReducer.isBusy,
    unfollowResponse: state.UnFollowReducer.response,

});

export default connect(
    mapStateToProps,
    dispatch => {
        return {

            onGetAllProfile: bindActionCreators(onGetAllProfile, dispatch),
            onGetOtherStory: bindActionCreators(onGetOtherStory, dispatch),
            onFollow: bindActionCreators(onFollow, dispatch),
            onUnFollow: bindActionCreators(onUnFollow, dispatch),

        };
    }
)(OtherProfile);

