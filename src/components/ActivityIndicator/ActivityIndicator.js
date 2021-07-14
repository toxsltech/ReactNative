/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React from 'react'
import { ActivityIndicator } from 'react-native'
import { View } from 'react-native'

const Activity = props => {
    return (
        <View style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            opacity: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <ActivityIndicator size="large" color="gray" />
        </View>
    )
}

export default Activity;