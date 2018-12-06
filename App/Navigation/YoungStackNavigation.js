import { createAppContainer, createStackNavigator } from 'react-navigation';
import YoungProfileScreen from '../Screens/YoungProfileScreen'
import YoungTopicScreen from '../Screens/TopicScreen'
import OnboardingScreen from '../Screens/OnboardingScreen'

const YoungStack = createStackNavigator({
  Profile: { screen: YoungProfileScreen },
  Topic: { screen: YoungTopicScreen },
  Onboarding: { screen: OnboardingScreen}
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

export default createAppContainer(YoungStack);
