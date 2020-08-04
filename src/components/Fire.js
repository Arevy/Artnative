
import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';
// import 'firebase/firestore';
 // Optionally import the services that you want to use
  import "firebase/auth";
  import "firebase/database";
  import "firebase/firestore";
  import "firebase/functions";
  import "firebase/storage";
  
  // Initialize Firebase
  const firebaseConfig = {
    apiKey: "",
    authDomain: ".firebaseapp.com",
    databaseURL: ".firebaseio.com",
    projectId: "",
    storageBucket: ".appspot.com",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };
//   // Points to the root reference
//   const storage = firebase.storage();
//   const storageRef = storage.ref();
//   // Points to 'images'
//   const imagesRef = storageRef.child('images');
//   const spaceRef = storageRef.child('images/space.jpg');
//   // File path is 'images/space.jpg'
//   const path = spaceRef.fullPath;
//   // File name is 'space.jpg'
//   const name = spaceRef.name;
//   // Points to 'images'
// //   const imagesRef = spaceRef.parent;

// const {imageName} = this.state;
// let imageRef = firebase.storage().ref('/' + imageName);
// imageRef
//   .getDownloadURL()
//   .then((url) => {
//     //from url you can fetched the uploaded image easily
//     this.setState({profileImageUrl: url});
//   })
//   .catch((e) => console.log('getting downloadURL of image error => ', e));
  
firebase.initializeApp(firebaseConfig);  
// class Fire {
//     constructor() {
//         // Initialize Firebase
//         firebase.initializeApp(firebaseConfig); 
//     }

//     // _pickImage() {
//     //     this.setState({ uploadURL: 'gs://artnative-arevy.appspot.com' });
    
//     //     ImagePicker.launchImageLibrary({}, response => {
//     //       uploadImage(response.uri)
//     //         .then(url => this.setState({ uploadURL: url }))
//     //         .then(() => {
//     //           const url = this.state.uploadURL;
//     //           firebase.database().ref(`/albums/`).push({ url });
//     //         })
//     //         .catch(error => console.log(error));
//     //     })
//     //   };//tre vazut ce facem aici..... trebuie mutat continutul in folderul images

//     addPost = async ({ text, localUri }) => {
//         const remoteUri = await this.uploadPhotoAsync(localUri, `photos/${this.uid}/${Date.now()}`);

//         return new Promise((res, rej) => {
//             this.firestore
//                 .collection("posts")
//                 .add({
//                     text,
//                     uid: this.uid,
//                     timestamp: this.timestamp,
//                     image: remoteUri
//                 })
//                 .then(ref => {
//                     res(ref);
//                 })
//                 .catch(error => {
//                     rej(error);
//                 });
//         });
//     };

//     uploadPhotoAsync = (uri, filename) => {
//         return new Promise(async (res, rej) => {
//             const response = await fetch(uri);
//             const file = await response.blob();

//             let upload = firebase
//                 .storage()
//                 .ref(filename)
//                 .put(file);

//             upload.on(
//                 "state_changed",
//                 snapshot => {},
//                 err => {
//                     rej(err);
//                 },
//                 async () => {
//                     const url = await upload.snapshot.ref.getDownloadURL();
//                     res(url);
//                 }
//             );
//         });
//     };
    
//     // createUser = async user => {
//     //     let remoteUri = null;

//     //     try {
//     //         let response = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);

//     //         let db = this.firestore.collection("users").doc(this.uid);

//     //         db.set({
//     //             name: user.name,
//     //             email: user.email,
//     //             password: user.password
//     //         });
//     //         if (response && response.user) {
//     //             Alert.alert("Success ✅", "Account created successfully");
//     //             // this.props.navigation.navigate('Home');//ceva nu merge aici - nu face redirect
//     //             // firebase.then(() => this.props.navigation.navigate('Home'))
//     //             // navigation.reset({
//     //             //     routes: [{ name: 'Home' }],
//     //             //   });
//     //             const resetAction = NavigationActions.reset({
//     //                 index: 0,
//     //                 actions: [NavigationActions.navigate({ routeName: 'Profile' })],
//     //               });
//     //               this.props.navigation.dispatch(resetAction);
//     //           }
//     //     } catch (error) {
//     //         alert("Error: ", error);
//     //         console.log(error);
//     //         // console.error(error.message)
//     //     }
//     // };
    
//     signOut = () => {
//         firebase.auth().signOut();
//     };

//     get firestore() {
//         return firebase.firestore();
//     }

//     get uid() {
//         return (firebase.auth().currentUser || {}).uid;
//     }

//     get timestamp() {
//         return Date.now();
//     }
// }

// Fire.shared = new Fire();
export default firebase;
