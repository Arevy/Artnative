import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Animated,
  Image,
  StyleSheet,
  Switch,
  Text,
  View,
  FlatList
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { colors, device, gStyle, images } from '../constants';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: ...']);
// components
import LinearGradient from '../components/LinearGradient';
import TouchIcon from '../components/TouchIcon';
import TouchText from '../components/TouchText';

// mock data
import albums from '../mockdata';
class Album extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      album: null,
      scrollY: new Animated.Value(0),
      // title: null,
    };

    this.toggleBlur = this.toggleBlur.bind(this);
  }

  componentDidMount() {
    const { navigation, screenProps } = this.props;

    const albumTitle = navigation.getParam('album', 'ALBUM NOT FOUND?!');
    // const albumTitle = navigation.getParam('title', 'Extraordinary Machine');

    this.setState({
      album: albums[albumTitle] || null,
      title: albumTitle
    });
  }


  toggleBlur() {
    const {
      screenProps: { setToggleTabBar }
    } = this.props;

    setToggleTabBar();
  }

  render() {
    const {
      navigation,
      screenProps: { toggleTabBarState, setToggleTabBar }
    } = this.props;
    const { album, scrollY, title } = this.state;

    // album data not set?
    if (album === null) {
      return (
        <View style={[gStyle.container, gStyle.flexCenter]}>
          <Text style={{ color: colors.white }}>{`Album: ${title}`}</Text>
        </View>
      );
    }

    const stickyArray = device.web ? [] : [0];
    const headingRange = device.web ? [140, 200] : [230, 280];

    const opacityHeading = scrollY.interpolate({
      inputRange: headingRange,
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });



    return (
      <View style={gStyle.container}>
        {toggleTabBarState ? (
          <BlurView
            intensity={99}
            style={{ ...StyleSheet.absoluteFill, zIndex: 101 }}
            tint="dark"
          />
        ) : null}

        <View style={styles.containerHeader}>
          <Animated.View
            style={[styles.headerLinear, { opacity: opacityHeading }]}
          >
            <LinearGradient fill={album.backgroundColor} height={89} />
          </Animated.View>
          <View style={styles.header}>
            <TouchIcon
              icon={<Feather color={colors.white} name="chevron-left" />}
              onPress={() => navigation.goBack(null)}
            />
          </View>
        </View>

        <View style={styles.containerFixed}>
          <View style={styles.containerLinear}>
            <LinearGradient fill={album.backgroundColor} />
          </View>
          <View style={styles.containerImage}>
            <Image source={{uri: album.path}} style={styles.image} />
            {/* <Image source={{uri: item.path}} style={styles.image} /> */}
          </View>
          <View style={styles.containerTitle}>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
              {album.title}
            </Text>
          </View>
          <View style={styles.containerAlbum}>
            <Text style={styles.albumInfo}>
              {`By ${album.artist} · ${album.released}`}
            </Text>
          </View>
        </View>

        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false } //true
          )}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={stickyArray}
          style={styles.containerScroll}
        >
          <View style={styles.containerSticky}>
          </View>
          <View style={styles.containerOutput}>
            <FlatList
              // contentContainerStyle={styles.containerContent}
              data={album.views}
              keyExtractor={({ id }) => id.toString()}
              renderItem={({ item }) => (
              <View>
                  <Image source={{uri: item.path}} style={styles.image} />
              </View>
            )}
            />
            {/* <Image source={{uri: album.path}} style={styles.image} />
            <Image source={{uri: album.path}} style={styles.image} />
            <Image source={{uri: album.path}} style={styles.image} />
            <Image source={{uri: album.path}} style={styles.image} />
            <Image source={{uri: album.path}} style={styles.image} /> */}
          </View>
          <View style={gStyle.spacer16} />
        </Animated.ScrollView>
      </View>
    );
  }
}

Album.propTypes = {
  // required
  navigation: PropTypes.object.isRequired,
  screenProps: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  containerHeader: {
    height: 89,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 100
  },
  headerLinear: {
    height: 89,
    width: '100%'
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: device.iPhoneX ? 48 : 24,
    position: 'absolute',
    top: 0,
    width: '100%'
  },
  headerTitle: {
    ...gStyle.textSpotifyBold16,
    color: colors.white,
    paddingHorizontal: 8,
    marginTop: 2,
    textAlign: 'center',
    width: device.width - 100
  },
  containerFixed: {
    alignItems: 'center',
    paddingTop: device.iPhoneX ? 94 : 60,
    position: 'absolute',
    width: '100%',
  },
  containerLinear: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: device.web ? 5 : 0
  },
  containerImage: {
    shadowColor: colors.black,
    shadowOffset: { height: 8, width: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    zIndex: device.web ? 20 : 0
  },
  image: {
    height: 278,
    marginBottom: device.web ? 0 : 16,
    width: 278
  },
  image1: {
    height: 348,
    marginBottom: device.web ? 0 : 16,
    width: 348
  },
  containerTitle: {
    marginTop: device.web ? 8 : 0,
    zIndex: device.web ? 20 : 0
  },
  title: {
    ...gStyle.textSpotifyBold20,
    color: colors.white,
    paddingHorizontal: 24,
    marginBottom: 8,
    textAlign: 'center'
  },
  containerAlbum: {
    zIndex: device.web ? 20 : 0
  },
  albumInfo: {
    ...gStyle.textSpotify12,
    color: colors.greyInactive,
    marginBottom: 48
  },
  containerScroll: {
    paddingTop: 89
  },
  containerSticky: {
    marginTop: device.iPhoneX ? 338 : 294
  },
  containerStickyLinear: {
    top: 0,
    position: 'absolute',
    width: '100%'
  },
  btn: {
    backgroundColor: colors.brandPrimary,
    borderRadius: 25,
    height: 50,
    width: 220
  },
  btnText: {
    ...gStyle.textSpotifyBold16,
    color: colors.white,
    letterSpacing: 1,
    textTransform: 'uppercase'
  },
  containerOutput: {
    alignItems: 'center',
    backgroundColor: colors.blackBg,
    minHeight: 540,
  },
  containerOutputText:{
    marginTop: 80,
    fontSize:18,
    color: colors.greyInactive,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    width: '100%'
  }
});

export default Album;
