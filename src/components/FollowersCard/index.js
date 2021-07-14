/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import FollowersCard from "./FollowersCard";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { onGetProfile } from '../../modules/GetProfile';
import { onRemove } from '../../modules//RemoveFollowers'
import { onFollow } from '../../modules/Follow'

const mapStateToProps = state => ({

    isBusyProfile: state.GetProfileReducer.isBusy,
    getprofileResponse: state.GetProfileReducer.response,

    isBusyFollow: state.FollowReducer.isBusy,
    followResponse: state.FollowReducer.response,

    isBusyRemove: state.RemoveFollowerReducer.isBusy,
    removeResponse: state.RemoveFollowerReducer.response,

});

export default connect(
    mapStateToProps,
    dispatch => {
        return {
            onGetProfile: bindActionCreators(onGetProfile, dispatch),
            onRemove: bindActionCreators(onRemove, dispatch),
            onFollow: bindActionCreators(onFollow, dispatch),

        };
    }
)(FollowersCard);

