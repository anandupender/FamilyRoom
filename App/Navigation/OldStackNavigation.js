import { createAppContainer, createStackNavigator } from 'react-navigation';
import OldProfileScreen from '../Screens/OldProfileScreen'
import OldTopicScreen from '../Screens/OldTopicScreen'
import OnboardingScreen from '../Screens/OnboardingScreen'

const OldStack = createStackNavigator({
  Profile: { screen: OldProfileScreen },
  Topic: { screen: OldTopicScreen },
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

export default createAppContainer(OldStack);
