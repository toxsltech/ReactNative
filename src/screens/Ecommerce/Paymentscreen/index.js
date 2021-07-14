/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import Paymentscreen from './Paymentscreen';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AddToProduct } from '../../../ecommerceModules/AddProduct';
import { AddToProductOnline } from '../../../ecommerceModules/AddProductOnline';
import { onGetUserProduct } from '../../../ecommerceModules/GetUserProduct';


const mapStateToProps = state => ({
    isBusyCart: state.AddToProductReducer.isBusy,
    addProductResponse: state.AddToProductReducer.response,

    isBusyProduct: state.AddToProductOnlineReducer.isBusy,
    addProductOnlineResponse: state.AddToProductOnlineReducer.response,

    isBusyCart: state.GetUserProductReducer.isBusy,
    getUserProductResponse: state.GetUserProductReducer.response,

});

export default connect(
    mapStateToProps,
    dispatch => {
        return {
            AddToProduct: bindActionCreators(AddToProduct, dispatch),
            AddToProductOnline: bindActionCreators(AddToProductOnline, dispatch),
            onGetUserProduct: bindActionCreators(onGetUserProduct, dispatch),

        };
    },
)(Paymentscreen);
