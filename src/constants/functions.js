import { Image } from 'react-native';
import { Permissions } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

import preloadFonts from './preloadFonts';
import preloadImages from './preloadImages';
import * as firebase from "../components/Fire";
// import * as storage from '@react-native-firebase/storage';
// import 'firebase/database';

// cache fonts
// /////////////////////////////////////////////////////////////////////////////
// const cacheFonts = fonts => fonts.map(font => Font.loadAsync(font));
const cacheFonts = fonts => {
  return fonts.map(font => {
    if (typeof font === 'string') {
      return Font.prefetch(font);
    }
  });
};
// cache images
// /////////////////////////////////////////////////////////////////////////////
const cacheImages = images => {
  return Object.values(images).map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    }

    // return Asset.fromModule(image).downloadAsync();
  });
};

// preload async
// /////////////////////////////////////////////////////////////////////////////
const loadAssetsAsync = async () => {
  // preload assets
  const fontAssets = cacheFonts(preloadFonts);
  const imageAssets = cacheImages(preloadImages);

  // promise load all
  return Promise.all([...fontAssets, ...imageAssets]);
};

// camera permissions
// /////////////////////////////////////////////////////////////////////////////
const cameraAccessAsync = async () => {
  // get exisiting camera permissions first
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.CAMERA
  );
  let finalStatus = existingStatus;

  // ask again to grant camera permissions (if not already allowed)
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    finalStatus = status;
  }

  return finalStatus === 'granted';
};

// const pickImage = () => {
//   this.setState({ uploadURL: 'gs://artnative-arevy.appspot.com' });

//   ImagePicker.launchImageLibrary({}, response => {
//     uploadImage(response.uri)
//       .then(url => this.setState({ uploadURL: url }))
//       .then(() => {
//         const url = this.state.uploadURL;
//         firebase.database().ref(`/albums/`).push({ url });
//       })
//       .catch(error => console.log(error));
//   })
// };//tre vazut ce facem aici..... trebuie mutat continutul in folderul images

// // const ref = firebase.storage().ref("branding/card.jpg");
// // ref.getDownloadURL()
// // .then(url => {console.log(url)})
// // .catch(e=>{console.log(e);})

// const db = firebase.database()
// // const storage = firebase.storage()

export default {
  cacheFonts,
  cacheImages,
  loadAssetsAsync,
  cameraAccessAsync
  // pickImage
};
