/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from './env';

let http = '';
export default (http = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
}));
http.interceptors.request.use(
  async function (config) {
    const token = await AsyncStorage.getItem('token');
    if (token) config.headers[`x-token`] = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {

    if (error.response) {
      if (error.response.status === 400) {
        alert(error.response.data.message);
      }
      if (403 === error.response.status) {
        
        AsyncStorage.setItem('invaild', 'true')
        /**Add a 401 response interceptor*/
        // AsyncStorage.clear();

      } else {
        return Promise.reject(error);
      }
    }
  },
);
