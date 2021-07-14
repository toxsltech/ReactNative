/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import SubReplyCard from "./SubReplyCard";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getComments } from '../../modules/GetComments';
import { onGetProfile } from '../../modules/GetProfile';
import { LikeSubComment } from '../../modules/LikeSubComment';

const mapStateToProps = state => ({

    isBusyProfile: state.GetProfileReducer.isBusy,
    getprofileResponse: state.GetProfileReducer.response,

    isBusyComment: state.GetCommentsReducer.isBusy,
    commentResponse: state.GetCommentsReducer.response,

    isBusyComment: state.GetCommentsReducer.isBusy,
    likesubcommentResponse: state.GetCommentsReducer.response,

});

export default connect(
    mapStateToProps,
    dispatch => {
        return {
            onGetProfile: bindActionCreators(onGetProfile, dispatch),
            getComments: bindActionCreators(getComments, dispatch),
            LikeSubComment: bindActionCreators(LikeSubComment, dispatch),
        };
    }
)(SubReplyCard);
