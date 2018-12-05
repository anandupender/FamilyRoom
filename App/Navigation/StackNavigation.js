import { createAppContainer, createStackNavigator } from 'react-navigation';
import ProfileScreen from '../Screens/ProfileScreen'
import TopicScreen from '../Screens/TopicScreen'
import OnboardingScreen from '../Screens/OnboardingScreen'

const AppNavigator = createStackNavigator({
  Profile: { screen: ProfileScreen },
  Topic: { screen: TopicScreen },
  Onboarding: { screen: OnboardingScreen}
}, {
  headerMode: 'float',
  initialRouteName: 'Onboarding',

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
