
/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import Filtersearch from "./Filtersearch";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { onGetProfile } from '../../../modules/GetProfile';
import { onGetFullCategory } from '../../../ecommerceModules/Fullcategory';
import { onGetSearchProduct } from '../../../ecommerceModules/Searchproduct';

const mapStateToProps = state => ({

    isBusyFullCategory: state.GetFullCategoryReducer.isBusy,
    getfullcategoryResponse: state.GetFullCategoryReducer.response,

    isBusySearch: state.GetSearchproductReducer.isBusy,
    getsearchResponse: state.GetSearchproductReducer.response,

});

export default connect(
    mapStateToProps,
    dispatch => {
        return {
           
            onGetFullCategory: bindActionCreators(onGetFullCategory, dispatch),
            onGetSearchProduct: bindActionCreators(onGetSearchProduct, dispatch),

        };
    }
)(Filtersearch);
