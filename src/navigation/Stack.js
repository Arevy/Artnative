import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

// modal routes (dynamic transitions)
import ModalRoutes from './ModalRoutes';

// navigation
import TabNavigation from './TabNavigation';

// screens
import ModalMoreOptions from '../screens/ModalMoreOptions';
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";

const StackNavigator = createStackNavigator(
  {
    // Main Tab Navigation
    // /////////////////////////////////////////////////////////////////////////
    TabNavigation,

    // Modals
    // /////////////////////////////////////////////////////////////////////////

    ModalMoreOptions: {
      screen: ModalMoreOptions,
      navigationOptions: {
        gesturesEnabled: false
      }
    }
  },
  {
    headerMode: 'none',
    initialRouteName: 'TabNavigation',
    mode: 'modal',
    transitionConfig: ModalRoutes,
    transparentCard: true
  }
);

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
},
{
  headerMode: 'none',
  mode: 'modal',
  // transparentCard: true
});

export default  createAppContainer(
  createSwitchNavigator( 
    {
      Auth: AuthStack,
      App: StackNavigator
    },
    { 
      initialRouteName: "App"//App
    }
  ));
