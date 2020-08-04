import React from "react";
import { Platform, StyleSheet, Text, TextInput, View, TouchableOpacity, Image, StatusBar, ScrollView, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import UserPermissions from "../components/UserPermissions";
import * as ImagePicker from "expo-image-picker";
import Fire from "../components/Fire";
import * as firebase from 'firebase';
import {device, colors, fonts} from '../constants';

// const logoImgsrc = require("../assets/icon.png"); //vechea sursa, am adaugat prin url din firebase

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class RegisterScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        user: {
            name: "",
            email: "",
            password: "",
            // avatar: null
        },
        errorMessage: null
    };

    handleSignUp = () => {
        // Fire.shared.createUser(this.state.user);
          firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.user.email, this.state.user.password)
            .then(() => this.props.navigation.navigate('Login'))
            .catch(error => this.setState({ errorMessage: error.message }))
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.ScrollView1}>
                <View style={styles.logo}>
                    <Image
                        source={{ uri: '' }} style={styles.logoImg} 
                    ></Image>
                    <Text style={styles.greeting}>{`Hello!\nSign up to get started.`}</Text>
                </View>
                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={name => this.setState({ user: { ...this.state.user, name } })}
                            value={this.state.user.name}
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={email => this.setState({ user: { ...this.state.user, email } })}
                            value={this.state.user.email}
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={password => this.setState({ user: { ...this.state.user, password } })}
                            value={this.state.user.password}
                        ></TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text  style={styles.textButton}>Sign up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonRegister}
                    onPress={() => this.props.navigation.navigate("Login")}
                >
                    <Text style={{ color: colors.greyLight, fontSize: 13 }}>
                        Already have an account? <Text style={styles.textButtonRegister}>Sign in</Text>
                    </Text>
                </TouchableOpacity>
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
        ...Platform.select({
            ios: {
            //   backgroundColor: 'red',
                paddingTop:20,
            },
            android: {
            //   backgroundColor: 'blue',
            },
            web: {
            //    backgroundColor: 'green'
            }
        })
    },
    ScrollView1: {
        width: SCREEN_WIDTH,
    },
    logo:{
        justifyContent: 'center',
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
                marginTop: 0
            },
            android: {
                width: 150, 
                height: 150,
                marginTop: 0
            },
            web: {
                width: 200, 
                height: 200,
                marginTop: -70
            }
        }) 
    },
    greeting: {
        
        fontSize: 18,
        // fontFamily: fonts.artnativeBold,
        textAlign: "center",
        color: colors.white, 
        ...Platform.select({
            ios: {
                marginTop: 0,
            },
            android: {
                marginTop: 0,
            },
            web: {
                marginTop: -10,
            }
        }) 
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
        fontFamily: fonts.artnativeRegular,
    },
    errorMessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error: {
        color: colors.alert,
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    },
    back: {
        position: "absolute",
        top: 48,
        left: 32,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(21, 22, 48, 0.1)",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonRegister: {
        alignSelf: "center", 
        marginTop: 22 
    },
    textButtonRegister: { 
        fontWeight: "500", 
        color: colors.white, 
        fontFamily: fonts.artnativeRegular,
    }
});
