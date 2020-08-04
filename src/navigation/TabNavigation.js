import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { colors } from '../constants';

// navigation stacks
import StackHome from './StackHome';
import StackSearch from './StackSearch';
import StackLibrary from './StackLibrary';
import StackSettings from './StackSettings';


// components

const BottomTabNavigator = createBottomTabNavigator(
  {
    StackHome,
    StackLibrary,
    StackSearch,
    StackSettings
  },
  {
    initialRouteName: 'StackHome',
    tabBarOptions: {
      activeTintColor: colors.white,
      inactiveTintColor: colors.greyInactive,
      style: {
        backgroundColor: colors.grey,
        borderTopWidth: 0
      }
    }
  }
);

export default BottomTabNavigator;
