import React from 'react';
import { FlatList, StyleSheet, View, Button, Platform, Alert, Text, Dimensions } from 'react-native';
import { colors, fonts, device, gStyle } from '../constants';

import * as firebase from 'firebase';
// import auth from '@react-native-firebase/auth'
// components
import LineItemCategory from '../components/LineItemCategory';
import ScreenHeader from '../components/ScreenHeader';

// mock data
import yourLibrary from '../mockdata/menuYourLibrary';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default class Settings extends React.Component {
  
  state = {
    errorMessage: null,
    email: this.email,
  };
  // signOutUser =  () => {
  //   const { eerrorMessage} = this.state;
  //   firebase.auth().signOut().then(() => this.props.navigation.navigate('Login')).catch(error => this.setState({ errorMessage: error.message }));
  // };
  IdOnPress = (id) => {
    if (id == 1)
    {   
      const { eerrorMessage} = this.state;
      firebase.auth().signOut().then(() => this.props.navigation.navigate('Login')).catch(error => this.setState({ errorMessage: error.message }));
    }
    else 
    {
        if (Platform.OS === 'web') {
          alert("In lucru nr " + id);
        } 
        else {
          Alert.alert("Success ✅", "In lucru nr " + id);
        }
    }
  };
  getEmail() {
    let user = firebase.auth().currentUser;
    let email;

    if (user != null) {
      return email = user.email;
    }else{
      return email = ' not authenticated';
    }
    
  };
  render() {
    return (
        <View style={gStyle.container}>
          <View style={{ position: 'absolute', top: 0, width: SCREEN_WIDTH, zIndex: 10}}>
            <ScreenHeader title="Settings" />
          </View>
          <View style={styles.userInfo}>
           <Text style={styles.user}>You are authenticated with email: {this.getEmail()}  
            </Text>
          </View>
          <FlatList
            contentContainerStyle={styles.containerFlatlist}
            data={yourLibrary}
            keyExtractor={({ id }) => id.toString()}
            renderItem={({ item }) => (
              <LineItemCategory
                icon={item.icon}
                onPress={() => this.IdOnPress(item.id)}
                title={item.title}
              />
            )}
          />
        </View>
      )
    }
};


const styles = StyleSheet.create({
  containerFlatlist: {
    // marginTop: device.iPhoneX ? 88 : 64,
    ...Platform.select({
      ios: {
        marginTop: device.iPhoneX ? 18 : 14,
        // paddingBottom: SCREEN_HEIGHT/10
      },
      android: {
        paddingTop: 20,
        paddingBottom: SCREEN_HEIGHT/10
      },
      web: {
          marginTop: SCREEN_HEIGHT/17,
      }
  }),
  },
  user: {
    color: 'white',
    fontSize: 15,
    marginTop:10,
    paddingBottom:40
  },
  userInfo: {
    alignItems: 'center',
    ...Platform.select({
      ios: {
        paddingTop:70,
        marginBottom:0
      },
      android: {
        marginTop:70,
        marginBottom:-20
      },
      web: {
          marginTop: 100,
      }
  })
  }
});

