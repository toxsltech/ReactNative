/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import PostCardHome from "./PostCardHome";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { onReportPost } from '../../modules/ReportPost';
import { onFollow } from '../../modules/Follow';
import { getComments } from '../../modules/GetComments';
import { onGetProfile } from '../../modules/GetProfile';

import { isLiked, likeheart } from '../../modules/Like';
import { getLikes } from '../../modules/GetLikes';
import { onBlock } from '../../modules/BlockUser';
import { undoLiked } from '../../modules/UndoLike'
import { onUnFollow } from '../../modules/UnFollow'

const mapStateToProps = state => ({

    isBusyProfile: state.GetProfileReducer.isBusy,
    getprofileResponse: state.GetProfileReducer.response,

    isBusyReport: state.ReportPostReducer.isBusy,
    reportResponse: state.ReportPostReducer.response,

    isBusyFollow: state.FollowReducer.isBusy,
    followResponse: state.FollowReducer.response,

    isBusyComment: state.GetCommentsReducer.isBusy,
    commentResponse: state.GetCommentsReducer.response,

    isBusyLike: state.LikeReducer.isBusy,
    likeResponse: state.LikeReducer.response,

    isBusyGetlikes: state.GetLikesReducer.isBusy,
    getlikeResponse: state.GetLikesReducer.response,

    isBusyBlock: state.BlockUserReducer.isBusy,
    blockResponse: state.BlockUserReducer.response,

    heart: state.LikeReducer.heart,

    isBusyGetUndoLikes: state.UndoLikeReducer.isBusy,
    undoLikedResponse: state.UndoLikeReducer.response,
    isBusyUnFollow: state.UnFollowReducer.isBusy,
    unfollowResponse: state.UnFollowReducer.response,
});

export default connect(
    mapStateToProps,
    dispatch => {
        return {
            onGetProfile: bindActionCreators(onGetProfile, dispatch),
            onReportPost: bindActionCreators(onReportPost, dispatch),
            onFollow: bindActionCreators(onFollow, dispatch),
            getComments: bindActionCreators(getComments, dispatch),
            isLiked: bindActionCreators(isLiked, dispatch),
            getLikes: bindActionCreators(getLikes, dispatch),
            onBlock: bindActionCreators(onBlock, dispatch),
            likeheart: bindActionCreators(likeheart, dispatch),
            undoLiked: bindActionCreators(undoLiked, dispatch),
            onUnFollow: bindActionCreators(onUnFollow, dispatch),

        };
    }
)(PostCardHome);
