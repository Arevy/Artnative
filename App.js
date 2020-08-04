import React from 'react';
import { StatusBar } from 'react-native';
import { AppLoading } from 'expo';
import { func } from './src/constants';

// main navigation stack
import Stack from './src/navigation/Stack';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      toggleTabBar: false
    };
    this.setToggleTabBar = this.setToggleTabBar.bind(this);
  }

  setToggleTabBar() {
    this.setState(({ toggleTabBar }) => ({
      toggleTabBar: !toggleTabBar
    }));
  }


  render() {
    const { isLoading, toggleTabBar } = this.state;

    if (isLoading) {
      return (
        <AppLoading
          onFinish={() => this.setState({ isLoading: false })}
          startAsync={func.loadAssetsAsync}
          onError={e => console.error (e)}
        />
      );
    }

    return (
      <React.Fragment>
        <StatusBar barStyle="light-content" />

        <Stack
          screenProps={{
            setToggleTabBar: this.setToggleTabBar,
            toggleTabBarState: toggleTabBar
          }}
        />
      </React.Fragment>
    );
  }
}
