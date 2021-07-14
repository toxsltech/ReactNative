
/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Animated, StyleSheet, ViewPropTypes } from 'react-native';
import SocketManager from '../../socketManager';
import HeartShape from './HeartShape';

class FloatingMessages extends Component {
  state = {
    hearts: [],
    height: null,
    message: []
  };

  createHeart(index) {
    return {
      id: index,
      right: getRandomNumber(50, 150),
    };
  }

  removeHeart(id) {
    this.setState({ hearts: this.state.hearts.filter((heart) => heart.id !== id) });
  }

  componentDidMount = () => {
    SocketManager.instance.listenJoinLiveStream((data) => {
      setTimeout(() => {
        this.setState({ message: data.joinMessage });
      }, 500);

    });
  }

  componentWillUpdate(nextProps) {
    const oldCount = this.props.count;
    const newCount = nextProps.count;
    const numHearts = newCount - oldCount;

    if (numHearts <= 0) {
      return;
    }
    const items = Array(numHearts).fill();
    const newHearts = items.map((item, i) => i);
    this.setState({ hearts: this.state.hearts.concat(newHearts) });
  }

  handleOnLayout = (e) => {
    const { height } = e.nativeEvent.layout;
    this.setState({ height });
  };

  render() {
    const { height, message } = this.state;
    const { color, renderCustomShape } = this.props;
    const isReady = height !== null;
    const heartProps = { message };
    if (color !== null) {
      heartProps.color = color;
    }

    return (
      <View
        style={[styles.container, this.props.style]}
        onLayout={this.handleOnLayout}
        pointerEvents="none"
      >
        {isReady &&
          this.state.hearts.map(({ id, right }) => (
            <AnimatedShape
              key={id}
              height={height}
              style={{ right }}
              onComplete={this.removeHeart.bind(this, id)}
            >
              {renderCustomShape ? renderCustomShape(id) :
                <HeartShape {...heartProps} />}
            </AnimatedShape>
          ))}
      </View>
    );
  }
}

/**
 * @class AnimatedShape
 */

class AnimatedShape extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: new Animated.Value(0),
      shapeHeight: null,
      enabled: false,
      animationsReady: false,
    };
  }

  componentDidMount() {
    Animated.timing(this.state.position, {
      duration: 3500,
      useNativeDriver: true,
      toValue: this.props.height * -1,
    }).start(this.props.onComplete);
  }

  getAnimationStyle() {
    if (!this.state.animationsReady) {
      return { opacity: 0 };
    }

    return {
      transform: [
        { translateY: this.state.position },
        { translateX: this.xAnimation },
        { scale: this.scaleAnimation },
        { rotate: this.rotateAnimation },
      ],
      opacity: this.opacityAnimation,
    };
  }

  handleOnLayout = (e) => {
    if (this.rendered) {
      return null;
    }

    this.rendered = true;

    const height = Math.ceil(this.props.height);
    const negativeHeight = height * -1;
    const shapeHeight = e.nativeEvent.layout.height;

    this.yAnimation = this.state.position.interpolate({
      inputRange: [negativeHeight, 0],
      outputRange: [height, 0],
    });

    this.opacityAnimation = this.yAnimation.interpolate({
      inputRange: [0, height - shapeHeight],
      outputRange: [1, 0],
    });

    this.scaleAnimation = this.yAnimation.interpolate({
      inputRange: [0, 15, 30, height],
      outputRange: [0, 1.2, 1, 1],
    });

    this.xAnimation = this.yAnimation.interpolate({
      inputRange: [0, height / 2, height],
      outputRange: [0, 15, 0],
    });

    this.rotateAnimation = this.yAnimation.interpolate({
      inputRange: [0, height / 4, height / 3, height / 2, height],
      outputRange: ['0deg', '-2deg', '0deg', '2deg', '0deg'],
    });

    setTimeout(() => this.setState({ animationsReady: true }), 16);
  };

  render() {
    return (
      <Animated.View
        style={[styles.shapeWrapper, this.getAnimationStyle(), this.props.style]}
        onLayout={this.handleOnLayout}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

AnimatedShape.propTypes = {
  height: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
  children: PropTypes.node.isRequired,
};

AnimatedShape.defaultProps = {
  onComplete: () => { },
};

/**
 * Styles
 */

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },

  shapeWrapper: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
  },
});

/**
 * Helpers
 */

const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

/**
 * Exports
 */

export default FloatingMessages;
