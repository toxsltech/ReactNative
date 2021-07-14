/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import Login from "./Login";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { onLogin } from '../../../modules/Auth'
import { onGetProfile } from '../../../modules/GetProfile'
import { onGetStory } from '../../../modules/GetStory';
import { onGetPosts } from '../../../modules/GetPosts';

const mapStateToProps = state => ({
    isBusy: state.AuthReducer.isBusy,
    loginResponse: state.AuthReducer.response,
    isBusyProfile: state.GetProfileReducer.isBusy,
    getprofileResponse: state.GetProfileReducer.response,

    isBusyStory: state.GetStoryReducer.isBusy,
    getstoryResponse: state.GetStoryReducer.response,
    isBusyPost: state.GetPostsReducer.isBusy,
    getpostResponse: state.GetPostsReducer.response
});

export default connect(
    mapStateToProps,
    dispatch => {
        return {
            onLogin: bindActionCreators(onLogin, dispatch),
            onGetProfile: bindActionCreators(onGetProfile, dispatch),
            onGetStory: bindActionCreators(onGetStory, dispatch),
            onGetPosts: bindActionCreators(onGetPosts, dispatch)
        };
    }
)(Login);

