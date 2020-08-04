import device from './device';

export default {
  ArtnativeLight: 'artnativeLight',
  ArtnativeRegular: 'artnativeRegular',
  ArtnativeBold: 'artnativeBold',

  bold: device.iOS ? 'HelveticaNeue-Bold' : 'sans-serif-condensed',
  light: device.iOS ? 'HelveticaNeue-Light' : 'sans-serif-light',
  medium: device.iOS ? 'HelveticaNeue-Medium' : 'sans-serif-medium',
  regular: device.iOS ? 'HelveticaNeue' : 'sans-serif'
};
