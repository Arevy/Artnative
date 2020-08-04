import React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from 'react-navigation';

// screens
import Library from '../screens/Library';
import Album from '../screens/Album';

// icons
import SvgTabLibrary from '../components/icons/Svg.TabLibrary';

const Icon = ({ focused }) => <SvgTabLibrary active={focused} />;

Icon.propTypes = {
  // required
  focused: PropTypes.bool.isRequired
};

export default createStackNavigator(
  {
    LibraryMain: {
      screen: Library
    },
    Album
  },
  {
    headerMode: 'none',
    navigationOptions: {
      tabBarLabel: 'Library',
      tabBarIcon: Icon
    }
  }
);
