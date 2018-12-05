import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

export default class OnboardingScreen extends React.Component {
  constructor() {
    super();
  }

  nextScreen(){
    this.props.navigation.navigate("Profile");
  }

  render() {
    return (
      <View style={styles.container}>
        <Onboarding
          pages={[
            {
              backgroundColor: '#f0f',
              image: <Image source={require('../../assets/images/triangle1.png')} />,
              title: 'Onboarding',
              subtitle: 'Done with React Native Onboarding Swiper',
            },
            {
              backgroundColor: '#0ff',
              image: <Image source={require('../../assets/images/triangle2.png')} />,
              title: 'Onboarding',
              subtitle: 'Done with React Native Onboarding Swiper',
            },
            {
              backgroundColor: '#ff0',
              image: <Image source={require('../../assets/images/triangle3.png')} />,
              title: 'Onboarding',
              subtitle: 'Done with React Native Onboarding Swiper',
            }
          ]}
          onDone = {this.nextScreen}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
