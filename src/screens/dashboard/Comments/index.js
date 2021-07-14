/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import Comments from "./Comments";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getComments } from '../../../modules/GetComments';
import { isComment } from '../../../modules/Comment'
import { onGetPosts } from '../../../modules/GetPosts';
import { onGetProfile } from '../../../modules/GetProfile';
import { SubComment } from '../../../modules/SubComment'

const mapStateToProps = state => ({
    isBusyComment: state.GetCommentsReducer.isBusy,
    commentResponse: state.GetCommentsReducer.response,

    isBusyComment: state.CommentReducer.isBusy,
    CommentPostResponse: state.CommentReducer.response,


    isBusyPost: state.GetPostsReducer.isBusy,
    getpostResponse: state.GetPostsReducer.response,

    isBusyProfile: state.GetProfileReducer.isBusy,
    getprofileResponse: state.GetProfileReducer.response,

    isBusyProfile: state.SubCommentReducer.isBusy,
    SubCommentPostResponse: state.SubCommentReducer.response,
});

export default connect(
    mapStateToProps,
    dispatch => {
        return {
            getComments: bindActionCreators(getComments, dispatch),
            isComment: bindActionCreators(isComment, dispatch),
            onGetPosts: bindActionCreators(onGetPosts, dispatch),
            onGetProfile: bindActionCreators(onGetProfile, dispatch),
            SubComment: bindActionCreators(SubComment, dispatch),
        };
    }
)(Comments);
