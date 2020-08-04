// import React from 'react';
// import { Animated, StyleSheet, View, Image, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors, device, gStyle, images} from '../constants';
// import firebase from '../components/Fire.js';
// // components
// import AlbumsHorizontal from '../components/AlbumsHorizontal';

// mock data
import illustration from '../mockdata/illustration.json';
import branding from '../mockdata/branding.json';
import lettering from '../mockdata/lettering.json';
import album_illustration from '../mockdata/album_illustration.json';
import album_branding from '../mockdata/album_branding.json';
import album_lettering from '../mockdata/album_lettering.json';

import React, { Component } from "react";
import { Animated, Dimensions, ScrollView, StyleSheet, Text, View, FlatList, Image , TouchableOpacity, Platform} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const logo_img = '';
const branding_img = album_branding.path;
const illustration_img = album_illustration.path;
const lettering_img = album_lettering.path;

const xOffset = new Animated.Value(0);

const Screen = props => {
  return (
    <TouchableOpacity
          activeOpacity={gStyle.activeOpacity}
        >
        <View style={styles.scrollPage}>
          <Animated.View style={[styles.screen, transitionAnimation(props.index)]}>
            <Image source={{uri: props.image}} style={styles.image} />
            <Text style={styles.text}>{props.text}</Text>
          </Animated.View>
        </View>
     </TouchableOpacity>
  );
};

const transitionAnimation = index => {
  return {
    transform: [
    //   { perspective: 800 },
      {
        scale: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: [0.25, 1, 0.25]
        })
      },
      {
        rotateX: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: ["0deg", "0deg", "45deg"]
        })
      },
      {
        rotateY: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: ["-45deg", "0deg", "45deg"]
        })
      }
    ]
  };
};

class Home extends React.Component {
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
      // navigation,
      scrollY 
    } = this.state;
    const { navigation } = this.props;
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
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: xOffset } } }],
            { useNativeDriver: false }
          )}
          horizontal
          scrollEventThrottle={16}
          disableIntervalMomentum={false}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}

          onPress={() => this.navigation.navigate('StackLibrary')}
        > 
          <Screen text={`Welcome to Artnative`} image={logo_img} index={0}  onPress={() => navigation.navigate('StackLibrary')}/>
          <Screen text="Branding" image={branding_img} index={1}  onPress={() => navigation.navigate('Album', { album: branding})}/>
          <Screen text="Illustration" image={illustration_img} index={2}  onPress={() => navigation.navigate('Album', { album: illustration})}/>
          <Screen text="Lettering" image={lettering_img} index={3}  onPress={() => navigation.navigate('Album', { album: lettering})}/>
         </Animated.ScrollView>
         <View style={styles.intro}>
            {/* <Text style={styles.text}>{`   Explore native views of\n Maria Tabarcea artworks`}</Text> */}
            <Text style={styles.text}>{`   Explore native   `}</Text>
         </View>
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
  },
  image: {
    width:SCREEN_WIDTH/2,
    height: SCREEN_WIDTH/2,
  },
  scrollView: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.blackBg,
  },
  scrollPage: {
    width: SCREEN_WIDTH,
    padding: 20,
    alignItems: "center",
  },
  screen: {
    marginTop: SCREEN_HEIGHT/5,
    height: SCREEN_HEIGHT/3,
    width: SCREEN_WIDTH/1.5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: colors.grey
  },
  text: {
    // paddingTop: 5,
    fontSize: 23,
    fontWeight: "bold",
    color: colors.white,
  },
  intro: {
    width: SCREEN_WIDTH,
    padding: 20,
    alignItems: "center",
    flex: 0.5,
    backgroundColor: colors.blackBg,
    alignItems: "center",
  }
});

export default Home;
