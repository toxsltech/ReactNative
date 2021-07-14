/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import StoryCard from "./StoryCard";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getComments } from '../../modules/GetComments';
import { isStoryLiked } from '../../modules/StoryLikes';
import { getLikes } from '../../modules/GetLikes';
import { onGetOtherStory } from '../../modules/GetOtherStory';

const mapStateToProps = state => ({

    isBusyComment: state.GetCommentsReducer.isBusy,
    commentResponse: state.GetCommentsReducer.response,

    isBusyLike: state.StoryLikeReducer.isBusy,
    storylikeResponse: state.StoryLikeReducer.response,

    isBusyGetlikes: state.GetLikesReducer.isBusy,
    getlikeResponse: state.GetLikesReducer.response,


    isBusyotherStory: state.GetOtherStoryReducer.isBusy,
    getotherstoryResponse: state.GetOtherStoryReducer.response,

});

export default connect(
    mapStateToProps,
    dispatch => {
        return {

            getComments: bindActionCreators(getComments, dispatch),
            isStoryLiked: bindActionCreators(isStoryLiked, dispatch),
            getLikes: bindActionCreators(getLikes, dispatch),
            onGetOtherStory: bindActionCreators(onGetOtherStory, dispatch),
        };
    }
)(StoryCard);
