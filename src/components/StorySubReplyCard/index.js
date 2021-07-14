/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import StorySubReplyCard from "./StorySubReplyCard";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getStoryComments } from '../../modules/GetStoryComments'
import { onGetProfile } from '../../modules/GetProfile';
import { LikeSubComment } from '../../modules/LikeSubComment';

const mapStateToProps = state => ({

    isBusyProfile: state.GetProfileReducer.isBusy,
    getprofileResponse: state.GetProfileReducer.response,

    isBusyGetComments: state.StoryCommentReducer.isBusy,
    getcommentsResponse: state.StoryCommentReducer.response,

    isBusyComment: state.GetCommentsReducer.isBusy,
    likesubcommentResponse: state.GetCommentsReducer.response,
});

export default connect(
    mapStateToProps,
    dispatch => {
        return {
            onGetProfile: bindActionCreators(onGetProfile, dispatch),
            getStoryComments: bindActionCreators(getStoryComments, dispatch),
          LikeSubComment: bindActionCreators(LikeSubComment, dispatch),
        };
    }
)(StorySubReplyCard);
