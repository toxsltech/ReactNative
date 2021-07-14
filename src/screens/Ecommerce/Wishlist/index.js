
/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import Wishlist from "./Wishlist";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { onGetWishlist } from '../../../ecommerceModules/Getwishlist';
const mapStateToProps = state => ({

    isBusyCategory: state.GetwishlistReducer.isBusy,
    getWishlistResponse: state.GetwishlistReducer.response,

});

export default connect(
    mapStateToProps,
    dispatch => {
        return {
            onGetWishlist: bindActionCreators(onGetWishlist, dispatch),
        };
    }
)(Wishlist);
