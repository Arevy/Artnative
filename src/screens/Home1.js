import React from 'react';
import { Animated, StyleSheet, View, Image, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors, device, gStyle, images} from '../constants';
import firebase from '../components/Fire.js';
// components
import AlbumsHorizontal from '../components/AlbumsHorizontal';

// mock data
import illustration from '../mockdata/illustration.json';

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

  showImage=() => {
    // let storageRef = firebase.storage().ref();
    // let spaceRef = storageRef.child('branding/card.jpg');
    const ref = firebase.storage().ref('branding/card.jpg');
    const url = ref.getDownloadURL();
  };
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
    // const ref = firebase.storage().ref('branding/card.jpg');
    // const url = ref.getDownloadURL();
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
          {/* <Image source={{ uri: url }}  /> */}
          <FlatList
              contentContainerStyle={styles.containerContent}
              data={illustration}
              // horizontal
              keyExtractor={({ id }) => id.toString()}
              renderItem={({ item }) => (
              // <View style={styles.image}>
                  <Image source={{uri: item.path}} style={styles.image} />
              // </View>
            )}
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
  },
  image: {
    width:450,
    height: 450,
  },
});

export default Home;
