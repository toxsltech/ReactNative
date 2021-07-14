/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import http from '../../utils/http';
import { REPORT_POST_REQUEST, REPORT_POST_SUCCESS, REPORT_POST_FAILURE } from './types';

export const onReportPost = async (reportedTo, postReport, reason) => async dispatch => {
  dispatch({ type: REPORT_POST_REQUEST });
  try {
    const details = {
      'reportedTo': reportedTo,
      'postReport': postReport,
      'reason': reason
    }
    const response = await http.post('/report/report', details);
    const status = response.data.success;
    if (status) {
      return dispatch({
        type: REPORT_POST_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: REPORT_POST_FAILURE,
        payload: response,
      });
    }
  } catch (e) {
    dispatch({
      type: REPORT_POST_FAILURE,
      payload: e,
    });
    throw e;
  }
};
