/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import StoryLikes from "./StoryLikes";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { onGetStoryLike } from '../../../modules/GetStorylike'

const mapStateToProps = state => ({
    isBusyStoryLike: state.GetStoryLikeReducer.isBusy,
    getstorylikeResponse: state.GetStoryLikeReducer.response,
});

export default connect(
    mapStateToProps,
    dispatch => {
        return {
            onGetStoryLike: bindActionCreators(onGetStoryLike, dispatch),
        };
    }
)(StoryLikes);
