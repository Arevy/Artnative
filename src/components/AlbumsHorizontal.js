import React from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { colors, gStyle, images } from '../constants';

const AlbumsHorizontal = ({ data, heading, navigation, tagline }) => (
  <View style={styles.container}>
    {heading && <Text style={styles.heading}>{heading}</Text>}
    {tagline && <Text style={styles.tagline}>{tagline}</Text>}

    <FlatList
      contentContainerStyle={styles.containerContent}
      data={data}
      horizontal
      keyExtractor={({ id }) => id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          activeOpacity={gStyle.activeOpacity}
          hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
          onPress={() => navigation.navigate('Album', { album: item.album})}
          style={styles.item}
        >
          <View style={styles.image}>
              <Image source={{uri: item.path}} style={styles.image} />
          </View>
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
      )}
      showsHorizontalScrollIndicator={false}
    />
  </View>
);

AlbumsHorizontal.defaultProps = {
  heading: null,
  tagline: null
};

AlbumsHorizontal.propTypes = {
  // required
  data: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,

  // optional
  heading: PropTypes.string,
  tagline: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
    width: '100%'
  },
  containerContent: {
    paddingLeft: 16
  },
  heading: {
    ...gStyle.textartnativeBold18,
    color: colors.white,
    paddingBottom: 6,
    textAlign: 'center'
  },
  tagline: {
    ...gStyle.textartnative12,
    color: colors.greyInactive,
    paddingBottom: 6,
    textAlign: 'center'
  },
  item: {
    marginRight: 16,
    width: 178
  },
  image: {
    backgroundColor: colors.greyLight,
    height: 178,
    width: 178
  },
  title: {
    ...gStyle.textartnativeBold12,
    color: colors.white,
    marginTop: 4,
    textAlign: 'center'
  }
});

export default withNavigation(AlbumsHorizontal);
