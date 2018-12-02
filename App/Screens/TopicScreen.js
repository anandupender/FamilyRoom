import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import { Card } from "react-native-elements";

const { width } = Dimensions.get('window');
const height = width * 0.8;

const data = [
  {
    question: "\"How many different times have you moved?\""
  },
  {
    question: "\"When did you move to your current home?\""
  },
  {
    question: "\"Have you ever lived alone?\""
  },
  {
    question: "\"What was your scariest move?\""
  },
  {
    question: "\"Can you tell me about your favorite objects you always live with?\""
  }
];


export default class TopicScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      data: data,
    }
  }

  render() {
    //this contains all paramaters sent from previous profile screen
    const params = this.props.navigation.state.params;

    return (
      <View style={styles.container}>

        <View style={styles.category}>
          <View style={styles.categoryImage}>
          </View>

          <Text style={styles.categoryTitle}> On {params.topic} </Text>
        </View>



        <View style={styles.sampleQuestions}>
          <Text style={styles.sampleQuestionsTitle}> Sample Questions </Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={this.state.data}
            renderItem={({ item: rowData }) => {
              return (
                  <View style={styles.sampleQuestionCard}>
                    <Text> {rowData.question} </Text>
                  </View>
              );
            }}
            keyExtractor={(item, index) => index}
          />
        </View>



        <View style={styles.audio}>
          <View style={styles.audioImage}>
          </View>
        </View>

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
  },
  category: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoryImage: {
    width: 200,
    height: 100,
    borderWidth: 3,
    backgroundColor: '#71f2e1',
  },
  categoryTitle: {
    fontSize: 36,
  },
  sampleQuestions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  sampleQuestionsTitle: {
    fontSize: 28,
  },
  sampleQuestionCard: {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderRadius: 15,
    margin: 15,
    marginBottom: 0,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  audio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#71f2e1',
    width: '100%'
  },
  audioImage: {
    width: 100,
    height: 100,
    borderWidth: 3,
    borderRadius: 50,
    backgroundColor: '#f18f70'
  }
});
