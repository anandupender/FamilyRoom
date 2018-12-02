import { createAppContainer, createStackNavigator } from 'react-navigation';
import ProfileScreen from '../Screens/ProfileScreen'
import TopicScreen from '../Screens/TopicScreen'

const AppNavigator = createStackNavigator({
  Profile: { screen: ProfileScreen },
  Topic: { screen: TopicScreen },
}, {
  headerMode: 'float',
  initialRouteName: 'Profile',

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