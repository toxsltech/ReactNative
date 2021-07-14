/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import Viewers from "./Viewers";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { onGetViews } from '../../../modules/GetViews';

const mapStateToProps = state => ({
    isBusyGetViews: state.GetViewsReducer.isBusy,
    getviewsResponse: state.GetViewsReducer.response,
});

export default connect(
    mapStateToProps,
    dispatch => {
        return {
            onGetViews: bindActionCreators(onGetViews, dispatch),
        };
    }
)(Viewers);
