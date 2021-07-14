
/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import Newhome from "./Newhome";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { onGetProfile } from '../../../modules/GetProfile';
import { onGetCategory } from '../../../ecommerceModules/GetCategory';
import { onGetBanner } from '../../../ecommerceModules/GetBanner';
import { onGetCart } from '../../../ecommerceModules/GetCart';

const mapStateToProps = state => ({
    isBusyProfile: state.GetProfileReducer.isBusy,
    getprofileResponse: state.GetProfileReducer.response,

    isBusyCategory: state.GetCategoryReducer.isBusy,
    getcategoryResponse: state.GetCategoryReducer.response,

    isBusyBanner: state.GetBannerReducer.isBusy,
    getbannerResponse: state.GetBannerReducer.response,


    isBusyCart: state.GetCartReducer.isBusy,
    getcartResponse: state.GetCartReducer.response,
});

export default connect(
    mapStateToProps,
    dispatch => {
        return {
            onGetProfile: bindActionCreators(onGetProfile, dispatch),
            onGetCategory: bindActionCreators(onGetCategory, dispatch),
            onGetBanner: bindActionCreators(onGetBanner, dispatch),
            onGetCart: bindActionCreators(onGetCart, dispatch),

        };
    }
)(Newhome);
