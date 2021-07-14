/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import FollowersList from "./Followers";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { onGetProfile } from '../../../../../modules/GetProfile'
import { Followers } from '../../../../../modules/FollowersList'
import { onGetAllProfile } from '../../../../../modules/GetAllProfile';


const mapStateToProps = state => ({
    isBusyProfile: state.GetProfileReducer.isBusy,
    getprofileResponse: state.GetProfileReducer.response,

    isBusyFollowing: state.GetFollowersListReducer.isBusy,
    getfollowersResponse: state.GetFollowersListReducer.response,

    isBusyAllProfile: state.GetAllProfileReducer.isBusy,
    getallprofileResponse: state.GetAllProfileReducer.response,
});

export default connect(
    mapStateToProps,
    dispatch => {
        return {
            onGetProfile: bindActionCreators(onGetProfile, dispatch),
            Followers: bindActionCreators(Followers, dispatch),
            onGetAllProfile: bindActionCreators(onGetAllProfile, dispatch),
        };
    }
)(FollowersList);

