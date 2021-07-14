/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import Home from "./Home";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { onGetProfile } from '../../../modules/GetProfile';
import { onGetStory } from '../../../modules/GetStory';
import { onGetPosts } from '../../../modules/GetPosts';
import { onGetAllStory } from '../../../modules/GetAllStory';
import { onGetAllProfile } from '../../../modules/GetAllProfile';
import { onFollow } from '../../../modules/Follow';
import { onBlock } from '../../../modules/BlockUser';
import { onGetFollowersPosts } from '../../../modules/FollowersPosts';
import { videoview } from '../../../modules/Addvideoview';
import { getLikes } from '../../../modules/GetLikes';
import { Following } from '../../../modules/Following'
import { onUnFollow } from '../../../modules/UnFollow'

const mapStateToProps = state => ({
    isBusyProfile: state.GetProfileReducer.isBusy,
    getprofileResponse: state.GetProfileReducer.response,

    isBusyStory: state.GetStoryReducer.isBusy,
    getstoryResponse: state.GetStoryReducer.response,

    isBusyallStory: state.GetAllStoryReducer.isBusy,
    getallstoryResponse: state.GetAllStoryReducer.response,

    isBusyPost: state.GetPostsReducer.isBusy,
    getpostResponse: state.GetPostsReducer.response,

    isBusyAllProfile: state.GetAllProfileReducer.isBusy,
    getallprofileResponse: state.GetAllProfileReducer.response,

    isBusyFollow: state.FollowReducer.isBusy,
    followResponse: state.FollowReducer.response,

    isBusyBlock: state.BlockUserReducer.isBusy,
    blockResponse: state.BlockUserReducer.response,

    isBusyAllProfile: state.GetFollowersReducer.isBusy,
    getallpostResponse: state.GetFollowersReducer.response,

    isBusyVideo: state.VideoReducer.isBusy,
    VideoResponse: state.VideoReducer.response,


    isBusyGetlikes: state.GetLikesReducer.isBusy,
    getlikeResponse: state.GetLikesReducer.response,

    isBusyFollowing: state.GetFollowingReducer.isBusy,
    getfollowingResponse: state.GetFollowingReducer.response,

    isBusyUnFollow: state.UnFollowReducer.isBusy,
    unfollowResponse: state.UnFollowReducer.response,
});

export default connect(
    mapStateToProps,
    dispatch => {
        return {
            onGetProfile: bindActionCreators(onGetProfile, dispatch),
            onGetStory: bindActionCreators(onGetStory, dispatch),
            onGetAllStory: bindActionCreators(onGetAllStory, dispatch),
            onGetPosts: bindActionCreators(onGetPosts, dispatch),
            onGetAllProfile: bindActionCreators(onGetAllProfile, dispatch),
            onFollow: bindActionCreators(onFollow, dispatch),
            onBlock: bindActionCreators(onBlock, dispatch),
            onGetFollowersPosts: bindActionCreators(onGetFollowersPosts, dispatch),
            videoview: bindActionCreators(videoview, dispatch),
            getLikes: bindActionCreators(getLikes, dispatch),
            Following: bindActionCreators(Following, dispatch),
            onUnFollow: bindActionCreators(onUnFollow, dispatch),

        };
    }
)(Home);
