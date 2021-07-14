
/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import Contactus from "./Contactus";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isContact } from '../../../modules/Contactus';
import { onGetProfile } from '../../../modules/GetProfile';


const mapStateToProps = state => ({

     isBusyconatct: state.ContactReducer.isBusy,
     getcontactResponse: state.ContactReducer.response,
     
     isBusyProfile: state.GetProfileReducer.isBusy,
     getprofileResponse: state.GetProfileReducer.response,
  

});

export default connect(
    mapStateToProps,
    dispatch => {
        return {
           
            isContact: bindActionCreators(isContact, dispatch),
            onGetProfile: bindActionCreators(onGetProfile, dispatch),
        

        };
    }
)(Contactus);
