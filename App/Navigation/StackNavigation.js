import { createAppContainer, createStackNavigator } from 'react-navigation';
import ProfileScreen from '../Screens/ProfileScreen'
import TopicScreen from '../Screens/TopicScreen'
import AudioScreen from '../../AudioScreen'

const AppNavigator = createStackNavigator({
  Profile: { screen: ProfileScreen },
  Topic: { screen: TopicScreen },
  Audio: {screen: AudioScreen }
}, {
  headerMode: 'float',
  initialRouteName: 'Audio',

  navigationOptions: ({navigation}) => {

    let navTitle = 'Topic';
    if (navigation.state.params) {
      navTitle = navigation.state.params.title || navTitle;
    }

    return {
      title: navTitle,
    }
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
