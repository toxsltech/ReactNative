/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import LikedBy from "./LikedBy";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getLikes } from '../../../modules/GetLikes';

const mapStateToProps = state => ({
    isBusyGetLikes: state.GetLikesReducer.isBusy,
    getlikesResponse: state.GetLikesReducer.response,
});

export default connect(
    mapStateToProps,
    dispatch => {
        return {
            getLikes: bindActionCreators(getLikes, dispatch),
        };
    }
)(LikedBy);
