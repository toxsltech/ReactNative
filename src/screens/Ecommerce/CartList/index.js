/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import CartList from './CartList';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onGetCart } from '../../../ecommerceModules/GetCart';
import { EditToCart } from '../../../ecommerceModules/EditToCart';


const mapStateToProps = state => ({
    isBusyCart: state.GetCartReducer.isBusy,
    getcartResponse: state.GetCartReducer.response,

    isBusyaddCart: state.EditToCartReducer.isBusy,
    editcartResponse: state.EditToCartReducer.response,

});

export default connect(
    mapStateToProps,
    dispatch => {
        return {
            onGetCart: bindActionCreators(onGetCart, dispatch),
            EditToCart: bindActionCreators(EditToCart, dispatch),

        };
    },
)(CartList);
