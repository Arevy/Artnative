import React from "react";
import { Platform, View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Dimensions, Button, Modal, TouchableHighlight } from "react-native";
import * as firebase from "firebase";
import Fire from "../components/Fire.js";
import {device, colors, fonts} from '../constants';

import Constants from 'expo-constants';
// const logoImgsrc = require("../assets/icon.png"); //vechea sursa, am adaugat prin url din firebase

import * as LocalAuthentication from 'expo-local-authentication';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class LoginScreen extends React.Component {
    state = {
        email: "",
        password: "",
        errorMessage: null,
        authenticated: false,
        modalVisible: false,
        failedCount: 0,
        errorMessage: null
    };

    handleLogin = () => {
    const { email, password } = this.state;
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate('Home'))
        .catch(error => this.setState({ errorMessage: error.message }));
};


    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    clearState = () => {
        this.setState({ authenticated: false, failedCount: 0 });
    };

    scanFingerPrint = async () => {
        try {
        let results = await LocalAuthentication.authenticateAsync();
        if (results.success) {
            this.setState({
            modalVisible: false,
            authenticated: true,
            failedCount: 0,
            });
            firebase.auth().signInAnonymously()
                    .then(() => this.props.navigation.navigate('Home'))
                    .catch(error => this.setState({ errorMessage: error.message }));
        } else {
            this.setState({
            failedCount: this.state.failedCount + 1,
            });
        }
        } catch (e) {
        console.log(e);
        }
    };


    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.ScrollView1}>
                <View style={styles.logo}>
                    <Image
                        source={{ uri: '' }} style={styles.logoImg} 
                    ></Image>
                    {/* <Text style={styles.greeting}>{`Hello again.\nWelcome back.`}</Text> */}
                    <Text style={styles.greeting}>{`Welcome`}</Text>
                </View>
                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                        ></TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                    <Text style={styles.textButton}>Sign in</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonRegister}
                    onPress={() => this.props.navigation.navigate("Register")}
                >
                    <Text style={{ color: colors.greyLight, fontSize: 13 }}>
                        New to Artnative ?  <Text style={styles.textButtonRegister}>Sign Up</Text>
                    </Text>
                </TouchableOpacity>
                {!device.web 
                            &&  
                            <View>
                                <Text style={styles.localAuth}>OR </Text>
                                    <TouchableOpacity style={styles.button}> 
                                        <Text style={styles.textButton}
                                                    onPress={() => {
                                                        this.clearState();
                                                        if (Platform.OS === 'android') {
                                                            this.setModalVisible(!this.state.modalVisible);
                                                          } else {
                                                            this.scanFingerPrint();
                                                          }
                                                    }}
                                                >{
                                                    this.state.authenticated
                                                    ? ' Wait a second'
                                                    : ' Local Authentication '
                                                    }
                                        </Text>
                                    </TouchableOpacity>
                            </View>
                }
                {!device.web &&  //daca senzorul de amprenta se afla pe ecran trebuie sa apare modalul, degetul se pozitioneaza pe senzor fix unde este afisata imaginea
                        <View
                        style={[
                        styles.container,
                        this.state.modalVisible
                            ? { backgroundColor: '#b7b7b7' }
                            : { backgroundColor: 'white' },
                        ]}>
                         {/* <Button   //continuarea comentariului anterior -- aici butonul este din modal si declanseaza state.modalVisible
                                title={
                                    this.state.authenticated
                                    ? 'Reset and begin Authentication again'
                                    : 'Begin Authentication'
                                }
                                onPress={() => {
                                    this.clearState();
                                    if (Platform.OS === 'android') {
                                    this.setModalVisible(!this.state.modalVisible);
                                    } else {
                                    this.scanFingerPrint();
                                    }
                                }}
                                />     */}
                        <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onShow={this.scanFingerPrint}>
                        <View style={styles.modal}>
                            <View style={styles.innerContainer}>
                            <Text>Sign in with fingerprint</Text>
                            <Image
                                style={{ width: 128, height: 128 }}
                                source={require('../assets/fingerprint.png')}
                            />
                            {this.state.failedCount > 0 && (
                                <Text style={{ color: 'red', fontSize: 14 }}>
                                Failed to authenticate, press cancel and try again.
                                </Text>
                            )}
                            <TouchableHighlight
                                onPress={async () => {
                                LocalAuthentication.cancelAuthenticate();
                                this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text style={{ color: 'red', fontSize: 16 }}>Cancel</Text>
                            </TouchableHighlight>
                            </View>
                        </View>
                        </Modal>
                        </View>
                }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
        // fontFamily: fonts.artnativeRegular,
        backgroundColor: colors.blackBg,
        alignItems: 'center',
    },
    ScrollView1: {
        width: SCREEN_WIDTH,
    },
    logo:{
        // justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
            //   backgroundColor: 'red',
                paddingTop:10,
            },
            android: {
            //   backgroundColor: 'blue',
            },
            web: {
            //    backgroundColor: 'green'
                marginTop:200,
            }
        })
    },
    logoImg: { 
        
        ...Platform.select({
            ios: {
                width: 150, 
                height: 150,
                marginTop: SCREEN_HEIGHT/12,
            },
            android: {
                width: 150, 
                height: 150,
                marginTop: SCREEN_HEIGHT/12,
            },
            web: {
                width: 200, 
                height: 200,
                marginTop: -70
            }
        }) 
    },
    greeting: {
        ...Platform.select({
            ios: {
                marginBottom:20
            },
            android: {
                marginBottom:20
            },
            web: {
                marginTop: 22,
                marginBottom:20
            }
        }),
        fontSize: 18,
        // fontFamily: fonts.artnativeBold,
        textAlign: "center",
        color: colors.white, 
    },
    errorMessage: {
        height: 22,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
        // fontFamily: fonts.artnativeBold,
        ...Platform.select({
            ios: {
                marginBottom:20
            },
            android: {
                marginBottom:20
            },
            web: {
                marginBottom:20
            }
        }),
        
    },
    error: {
        color: colors.alert,
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center",
        // fontFamily: fonts.ArtnativeBold,
    },
    form: {
        ...Platform.select({
            ios: {
                 marginHorizontal: 30,
            },
            android: {
                marginHorizontal: 30,
            },
            web: {
                // width: device.width/1,
                // alignItems: 'center',
                // justifyContent: "center",
                marginHorizontal:100,
            }
        }),
        marginBottom: 18,
        // fontFamily: fonts.artnativeRegular,
    },
    inputTitle: {
        color: colors.greyLight,
        fontSize: 10,
        textTransform: "uppercase",
    
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: colors.white, 
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: colors.grey3,
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
        ...Platform.select({
            ios: {
                 marginHorizontal: 30,
            },
            android: {
                marginHorizontal: 30,
            },
            web: {
                marginHorizontal:100,
            }
        }),
    },
    textButton: { 
        color: colors.white, 
        fontWeight: "500" ,
        // fontFamily: fonts.artnativeRegular,
    },
    buttonRegister: {
        alignSelf: "center", 
        marginTop: 22 
    },
    textButtonRegister: { 
        fontWeight: "500", 
        color: colors.white, 
        // fontFamily: fonts.artnativeRegular,
    },
    localAuth: {
        color: colors.greyLight, 
        fontSize: 13 ,
        marginVertical: 6,
        marginLeft:SCREEN_WIDTH/2.1,
    },
    containerA: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        paddingTop: Constants.statusBarHeight,
        padding: 8,
      },
      modal: {
        flex: 1,
        marginTop: '90%',
        backgroundColor: '#E5E5E5',
        justifyContent: 'center',
        alignItems: 'center',
      },
      innerContainer: {
        marginTop: '30%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      textA: {
        alignSelf: 'center',
        fontSize: 22,
        paddingTop: 20,
      },
});
