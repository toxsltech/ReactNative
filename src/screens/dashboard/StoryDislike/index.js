/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import StoryDisLike from "./StoryDisLike";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { onGetStoryDisLike } from '../../../modules/GetStoryDislike'

const mapStateToProps = state => ({
    isBusyStoryDisLike: state.GetStoryDisLikeReducer.isBusy,
  getstorydislikeResponse: state.GetStoryDisLikeReducer.response,
});

export default connect(
    mapStateToProps,
    dispatch => {
        return {
            onGetStoryDisLike: bindActionCreators(onGetStoryDisLike, dispatch),
        };
    }
)(StoryDisLike);
