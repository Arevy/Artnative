import React from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors, device, gStyle } from '../constants';

// components
import PlaylistItem from '../components/PlaylistItem';
import TouchIcon from '../components/TouchIcon';

// icons
import SvgSearch from '../components/icons/Svg.Search';

// mock data
import browseAll from '../mockdata/searchBrowseAll';
import topGenres from '../mockdata/searchTopGenres';

// bars
import { SearchBar } from 'react-native-elements';


class Search extends React.Component {
  constructor(props) {
    super(props);

    // search start (24 horizontal padding )
    const searchStart = device.width - 48;

    this.state = {
      scrollY: new Animated.Value(0),
      searchStart,
      searchEnd: searchStart - 40,
      search: ''
    };
  }
  // uiLoading = () => {
  //   if(this.search == ''){
  //     return false;
  //   }
  //   return true;
  // };
  updateSearch = (search) => {
    this.setState({ search });
  };

  IdOnPress = (id) => {
  
    // if (id == 1)
    // { 
      // this.props.album = 'illustration';
      // this.props.navigation.navigate('Album', {album = 'illustration'});
      
    // }
    // else 
    // {
    //     if (Platform.OS === 'web') {
    //       alert("In lucru nr " + id);
    //     } 
    //     else {
    //       Alert.alert("Success ✅", "In lucru nr " + id);
    //     }
    // }
  };
  
  render() {
    const { scrollY, searchStart, searchEnd, search } = this.state;

    const opacity = scrollY.interpolate({
      inputRange: [0, 48],
      outputRange: [searchStart, searchEnd],
      extrapolate: 'clamp'
    });
    const { navigation } = this.props;

    return (
      <React.Fragment>
        <Animated.ScrollView
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: scrollY } } }
          ])}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[1]}
          style={gStyle.container}
        >
          <View style={gStyle.spacer11} />
          <View style={styles.containerSearchBar}>
            <Animated.View style={{ width: opacity}}>
              <SearchBar
                round
                placeholder="Artists, artworks, and others..."
                onChangeText={this.updateSearch}
                value={search}
                // showLoading={uiLoading}
                // ActivityIndicator={true}
                containerStyle={{backgroundColor: colors.transparent, borderWidth: 0, borderBottomColor:colors.transparent, borderTopColor:colors.transparent}}
              />
            </Animated.View>
          </View>

          <Text style={styles.sectionHeading}>Top gen</Text>
          <View style={styles.containerRow}>
            {Object.keys(topGenres).map(index => {
              const item = topGenres[index];

              return (
                <View key={item.id} style={styles.containerColumn}>
                  <PlaylistItem
                    bgColor={item.color}
                    onPress={() => this.props.navigation.navigate('StackLibrary')}//this.IdOnPress(item.id)
                    title={item.title}
                  />
                </View>
              );
            })}
          </View>

          <Text style={styles.sectionHeading}>Browse all</Text>
          <View style={styles.containerRow}>
            {Object.keys(browseAll).map(index => {
              const item = browseAll[index];

              return (
                <View key={item.id} style={styles.containerColumn}>
                  <PlaylistItem
                    bgColor={item.color}
                    onPress={() => this.props.navigation.navigate('StackLibrary')}
                    title={item.title}
                  />
                </View>
              );
            })}
          </View>
        </Animated.ScrollView>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  containerSearchBar: {
    ...gStyle.pH3,
    backgroundColor: colors.blackBg,
    paddingBottom: 16,
    paddingTop: device.iPhoneX ? 64 : 24,
  },
  sectionHeading: {
    ...gStyle.textartnativeBold18,
    color: colors.white,
    marginLeft: 24,
    marginTop: 16,
    marginBottom: 16
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 24
  },
  containerColumn: {
    width: '50%',
  }
});

export default Search;
