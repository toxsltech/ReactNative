/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React from 'react';
import { View, Image, TouchableOpacity, Animated } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PinchZoomView from 'react-native-pinch-zoom-view';

class ImageDisplayed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,

        }
    }
    onLayout = e => {
        this.setState({
            width: e.nativeEvent.layout.width
        });
    }
    parentMethod(data) {
        this.setState({ xcoord: data.offsetX, ycoord: data.offsetY, scale: data.scale })
    }
    render() {
        const { index } = this.props.route.params;

        return (
            <View style={{ backgroundColor: "white", flex: 1, alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                    style={styles.crossContainer}>
                    <Image
                        source={require('../assets/icons/cross.png')}
                        style={styles.cross}
                    />
                </TouchableOpacity>

                <PinchZoomView
                    onRef={ref => (this.parentReference = ref)}
                    parentReference={this.parentMethod.bind(this)}
                    minScale={0.5}
                    maxScale={10}
                >
                    <Animated.View >
                        <View style={styles.image2} onLayout={() => this.onLayout}>
                            <SliderBox
                                images={index}
                                sliderBoxHeight={hp('100')}
                                parentWidth={this.state.width}
                                circleLoop
                                resizeMode={'contain'}
                                dotColor="#f1c40f"
                                inactiveDotColor="#90A4AE"
                                resizeMethod={'resize'}
                                ImageComponentStyle={{ width: '100%', backgroundColor: '#fff', }}
                                imageLoadingColor="#f1c40f"
                                dotStyle={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 10,
                                    marginHorizontal: 2,
                                    paddingHorizontal: 10,
                                }}
                                bounces={false}
                            />
                        </View>
                    </Animated.View>
                </PinchZoomView>

            </View>
        );
    }
}

export default ImageDisplayed;

const styles = {

    cross: {
        height: wp('6'),
        width: wp('6'),
        resizeMode: 'contain',
        tintColor: '#000'
    },
    crossContainer: {
        position: 'absolute',
        top: wp('15'),
        right: wp('5'),
        zIndex: 20,
    },
    image2: {
        width: wp('89'),
        overflow: "hidden",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginTop: wp('10')
    },
};
