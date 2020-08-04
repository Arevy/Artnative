import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors, device, gStyle } from '../constants';

// components
import LineItemCategory from '../components/LineItemCategory';
import ScreenHeader from '../components/ScreenHeader';

import AlbumsHorizontal from '../components/AlbumsHorizontal';

// mock data
import yourLibrary from '../mockdata/menuYourLibrary';


import illustration from '../mockdata/illustration.json';
import branding from '../mockdata/branding.json';
import lettering from '../mockdata/lettering.json';

console.disableYellowBox = true;

class Library extends React.Component{
  constructor(props) {
    super(props);
    this.buttonPress = this.buttonPress.bind(this);
    this.state = {
      scrollY: new Animated.Value(0),
      navigation: null
    };
  }
  buttonPress() {
    this.props.navigation.navigate('StackSettings');
  }
  // const { navigate } = this.props.navigation;
  render() {
    const { 
      navigation,
      scrollY 
    } = this.state;

    const opacityIn = scrollY.interpolate({
      inputRange: [0, 128],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });

    const opacityOut = scrollY.interpolate({
      inputRange: [0, 88],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });

    return (
      <React.Fragment>
        {device.iPhoneX && (
          <Animated.View style={[styles.iPhoneNotch, { opacity: opacityIn }]} />
        )}

        <Animated.View
          style={[styles.containerHeader, { opacity: opacityOut }]}
        >
          <FontAwesome color={colors.white} name="cog" size={28}  onPress={this.buttonPress}/>
        </Animated.View>

        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          style={gStyle.container}
        >
          <View style={gStyle.spacer11} />
          
          <AlbumsHorizontal
            data={illustration}
            heading="Illustration"
            tagline="Daily news"
          />

          <AlbumsHorizontal
            data={branding}
            heading="Branding"
            tagline="Daily news"
          />

          <AlbumsHorizontal
            data={lettering}
            heading="Lettering"
            tagline="Daily news"
          />

          <AlbumsHorizontal
            data={illustration}
            heading="Illustration"
            tagline="Daily news"
          />

          <AlbumsHorizontal
            data={branding}
            heading="Branding"
            tagline="Daily news"
          />

          <AlbumsHorizontal
            data={lettering}
            heading="Lettering"
            tagline="Daily news"
          />
        </Animated.ScrollView>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  iPhoneNotch: {
    backgroundColor: colors.black70,
    height: 44,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 20
  },
  containerHeader: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: device.iPhoneX ? 60 : 36,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 10
  }
});
export default Library;
