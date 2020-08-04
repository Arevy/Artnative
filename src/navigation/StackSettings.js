import React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from 'react-navigation';

// screens
import SettingsScreen from '../screens/Settings';

// icons
import  SvgTabSettings from '../components/icons/Svg.TabSettings';

const Icon = ({ focused }) => <SvgTabSettings active={focused} />;

Icon.propTypes = {
  // required
  focused: PropTypes.bool.isRequired
};

export default createStackNavigator(
  {
    LibraryMain: {
      screen: SettingsScreen
    }
  },
  {
    headerMode: 'none',
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: Icon
    }
  }
);
