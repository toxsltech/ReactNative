/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import Filtersearchtag from "./Filtersearchtag";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { onWishlist } from '../../ecommerceModules/Addwishlist';
import { onDeleteWishlist } from '../../ecommerceModules/Deletewishlist';



const mapStateToProps = state => ({


    isBusyWishlist: state.AddwishlistReducer.isBusy,
    WishlistResponse: state.AddwishlistReducer.response,

    isBusyDeleteWishlist: state.DeletewishlistReducer.isBusy,
    DeleteWishlistResponse: state.DeletewishlistReducer.response,

    
});

export default connect(
    mapStateToProps,
    dispatch => {
        return {
           
            onWishlist: bindActionCreators(onWishlist, dispatch),
            onDeleteWishlist: bindActionCreators(onDeleteWishlist, dispatch),
       
        };
    }
)(Filtersearchtag);
