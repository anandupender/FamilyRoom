import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import YoungProfileScreen from '../Screens/YoungProfileScreen'
import YoungStack from '../Navigation/YoungStackNavigation'
import OldStack from '../Navigation/OldStackNavigation'

const TabNavigator = createBottomTabNavigator({
  Young: { screen: YoungStack },
  Old: { screen: OldStack },
});

export default createAppContainer(TabNavigator);
