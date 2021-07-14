
/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import Storescreen from "./Storescreen";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { onGetStore } from '../../../ecommerceModules/GetStore'
import { onWishlist } from '../../../ecommerceModules/Addwishlist';
import { onDeleteWishlist } from '../../../ecommerceModules/Deletewishlist';

const mapStateToProps = state => ({
    isBusySeller: state.GetStoreReducer.isBusy,
    storeResponse: state.GetStoreReducer.response,

    isBusyWishlist: state.AddwishlistReducer.isBusy,
    WishlistResponse: state.AddwishlistReducer.response,

    isBusyDeleteWishlist: state.DeletewishlistReducer.isBusy,
    DeleteWishlistResponse: state.DeletewishlistReducer.response,

});

export default connect(
    mapStateToProps,
    dispatch => {
        return {
            onGetStore: bindActionCreators(onGetStore, dispatch),
            onWishlist: bindActionCreators(onWishlist, dispatch),
            onDeleteWishlist: bindActionCreators(onDeleteWishlist, dispatch),
        };
    }
)(Storescreen);
