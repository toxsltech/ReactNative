/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import Address from './Address';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onGetProfile } from '../../../modules/GetProfile';
import { onGetAddress } from '../../../ecommerceModules/GetAddress'


const mapStateToProps = state => ({
    isBusyProfile: state.GetProfileReducer.isBusy,
    getprofileResponse: state.GetProfileReducer.response,

    isBusyProfile: state.GetAddressReducer.isBusy,
    getaddressResponse: state.GetAddressReducer.response,
});

export default connect(
    mapStateToProps,
    dispatch => {
        return {
            onGetProfile: bindActionCreators(onGetProfile, dispatch),
            onGetAddress: bindActionCreators(onGetAddress, dispatch),

        };
    },
)(Address);
