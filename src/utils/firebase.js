/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDKMBJtQyd0PmZk4PVn0ltG7ZvNhEMv9oI",
    authDomain: "com.fambase",
    projectId: "fambase-b7c13",
    storageBucket: "fambase-b7c13.appspot.com",
    appId: "1:385657139995:android:66a7dd531165f7524399be",

};


if (!firebase.apps.length) {
    firebase.initializeApp({firebaseConfig});
}
