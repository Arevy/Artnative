import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, gStyle } from '../constants';

const PlaylistItem = ({ bgColor, onPress, title }) => (
  <TouchableOpacity
    activeOpacity={gStyle.activeOpacity}
    onPress={onPress}
    style={[styles.playlistItem, { backgroundColor: bgColor }]}
  >
    <Text style={styles.playlistTitle}>{title}</Text>
  </TouchableOpacity>
);

PlaylistItem.propTypes = {
  // required
  bgColor: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  playlistItem: {
    borderRadius: 100,
    height: 78,
    flex: 1,
    marginBottom: 24,
    marginRight: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  playlistTitle: {
    ...gStyle.textartnativeBold18,
    color: colors.white
  }
});

export default PlaylistItem;
