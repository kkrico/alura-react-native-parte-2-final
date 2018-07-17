import { Navigation } from 'react-native-navigation';
import { AsyncStorage } from 'react-native';
import Feed from './components/Feed';
import Login from './screens/Login';
import Atividades from './screens/Atividades';

export default () => {
  Navigation.registerComponent('Login', () => Login);
  Navigation.registerComponent('Feed', () => Feed);
  Navigation.registerComponent('PerfilUsuario', () => Feed);
  Navigation.registerComponent('Atividades', () => Atividades);

  AsyncStorage.getItem('token')
    .then(token => {

      if(token) {
        Navigation.startTabBasedApp({
          tabs: [
            {
              label: 'Feed',
              screen: 'Feed',
              icon: require('../resources/img/icon-home.png'), 
              selectedIcon: require('../resources/img/icon-home.png'),
              title: 'Instalura',
            },
            {
              label: 'Atividades',
              screen: 'Atividades',
              icon: require('../resources/img/icon-activities.png'),
              selectedIcon: require('../resources/img/icon-activities.png'),
              title: 'Atividades'
            }
          ],
        });
      
      } else {
        const screen = {
          screen: 'Login',
          title: 'Login',
        };
        Navigation.startSingleScreenApp({screen});
      }

      
    });

}
