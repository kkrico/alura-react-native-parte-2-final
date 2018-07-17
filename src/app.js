import { Navigation } from 'react-native-navigation';
import { AsyncStorage } from 'react-native';
import Feed from './components/Feed';
import Login from './screens/Login';

export default () => {
  Navigation.registerComponent('Login', () => Login);
  Navigation.registerComponent('Feed', () => Feed);
  Navigation.registerComponent('PerfilUsuario', () => Feed);

  AsyncStorage.getItem('token')
    .then(token => {

      if(token) {
        return {
          screen: 'Feed',
          title: 'Instalura',
        };
      }

      return {
        screen: 'Login',
        title: 'Login',
      };
    })
    .then(screen => Navigation.startSingleScreenApp({screen}));


}
