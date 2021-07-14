
/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import Storeprofile from "./Storeprofile";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { onGetSingleproduct } from '../../../ecommerceModules/Singleproduct';
import { onWishlist } from '../../../ecommerceModules/Addwishlist';
import { onDeleteWishlist } from '../../../ecommerceModules/Deletewishlist';
import { onReview } from '../../../ecommerceModules/AddReview';
import { onGetReview } from '../../../ecommerceModules/GetReview ';
import { AddToCart } from '../../../ecommerceModules/AddToCart';
import { onGetCart } from '../../../ecommerceModules/GetCart';


const mapStateToProps = state => ({


    isBusySingleproduct: state.GetSingleproductReducer.isBusy,
    getSingleproductResponse: state.GetSingleproductReducer.response,

    isBusyWishlist: state.AddwishlistReducer.isBusy,
    WishlistResponse: state.AddwishlistReducer.response,

    isBusyDeleteWishlist: state.DeletewishlistReducer.isBusy,
    DeleteWishlistResponse: state.DeletewishlistReducer.response,

    isBusyonReview: state.AddReviewReducer.isBusy,
    onReviewResponse: state.AddReviewReducer.response,

    isBusygetReview: state.onGetReviewReducer.isBusy,
    getReviewResponse: state.onGetReviewReducer.response,

    isBusyaddCart: state.AddToCartReducer.isBusy,
    addcartResponse: state.AddToCartReducer.response,

    isBusyCart: state.GetCartReducer.isBusy,
    getcartResponse: state.GetCartReducer.response,


});

export default connect(
    mapStateToProps,
    dispatch => {
        return {

            onGetSingleproduct: bindActionCreators(onGetSingleproduct, dispatch),
            onWishlist: bindActionCreators(onWishlist, dispatch),
            onDeleteWishlist: bindActionCreators(onDeleteWishlist, dispatch),
            onReview: bindActionCreators(onReview, dispatch),
            onGetReview: bindActionCreators(onGetReview, dispatch),
            AddToCart: bindActionCreators(AddToCart, dispatch),
            onGetCart: bindActionCreators(onGetCart, dispatch),
       

        };
    }
)(Storeprofile);
