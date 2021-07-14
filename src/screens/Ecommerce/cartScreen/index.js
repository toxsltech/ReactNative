/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import Cartscreen from './Cartscreen';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onGetUserProduct } from '../../../ecommerceModules/GetUserProduct';

const mapStateToProps = state => ({
    isBusyCart: state.GetUserProductReducer.isBusy,
    getUserProductResponse: state.GetUserProductReducer.response,

});

export default connect(
    mapStateToProps,
    dispatch => {
        return {
            onGetUserProduct: bindActionCreators(onGetUserProduct, dispatch),
        };
    },
)(Cartscreen);
