/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import Images from "./Images";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { onGetFeeds } from '../../../../modules/GetFeeds';

const mapStateToProps = state => ({
    isBusyFeed: state.GetFeedsReducer.isBusy,
    getfeedResponse: state.GetFeedsReducer.response
});

export default connect(
    mapStateToProps,
    dispatch => {
        return {
            onGetFeeds: bindActionCreators(onGetFeeds, dispatch)
        };
    }
)(Images);

