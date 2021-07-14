/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import Global from "./Global";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { onGetProfile } from '../../../../modules/GetProfile';
import { onGetStory } from '../../../../modules/GetStory';
import { onGetPosts } from '../../../../modules/GetPosts';
import { onGetAllStory } from '../../../../modules/GetAllStory';

const mapStateToProps = state => ({
  isBusyProfile: state.GetProfileReducer.isBusy,
  getprofileResponse: state.GetProfileReducer.response,

    isBusyStory: state.GetStoryReducer.isBusy,
    getstoryResponse: state.GetStoryReducer.response,

    isBusyPost: state.GetPostsReducer.isBusy,
    getpostResponse: state.GetPostsReducer.response,


    isBusyallStory: state.GetAllStoryReducer.isBusy,
    getallstoryResponse: state.GetAllStoryReducer.response,

});

export default connect(
    mapStateToProps,
    dispatch => {
        return {
            onGetProfile: bindActionCreators(onGetProfile, dispatch),
            onGetStory: bindActionCreators(onGetStory, dispatch),
            onGetPosts: bindActionCreators(onGetPosts, dispatch),
            onGetAllStory: bindActionCreators(onGetAllStory, dispatch),

        };
    }
)(Global);

