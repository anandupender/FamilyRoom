import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import { Topics } from '../Themes'


export default class OldProfileScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      data: Topics,
    }
  }

  _goToTopic = (currTopic, topicQuestions) => {
    this.props.navigation.navigate("Topic", { topic: currTopic, questions: topicQuestions});
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.category}>
          <Image style={styles.categoryImage} source={require('../../assets/images/mina.jpg')}/>

          <Text style={styles.categoryTitle}> Your Records </Text>
        </View>



        <View style={styles.allRecords}>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={this.state.data}
            renderItem={({ item: rowData }) => {
              return (
                <TouchableOpacity onPress={() => this._goToTopic(rowData.title, rowData.questions)} style={styles.recordContainer}>
                  <Image
                    source={require('../../assets/images/record.png')}
                    style={styles.record}
                  />
                  <Text style={styles.recordTitle}> {rowData.title} </Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index}
          />
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
    width: 220,
    height: 150,
    // borderWidth: 3,
    backgroundColor: '#EEEEEE',
  },
  categoryTitle: {
    fontSize: 36,
  },
  allRecords: {
    flex: 4,
    justifyContent: 'center',
    borderTopWidth: 1,
  },
  sampleQuestionsTitle: {
    fontSize: 28,
  },
  recordContainer:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  record: {
    width: 150,
    height: 150,
    margin: 15,
    marginBottom: 0,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain'
  },
  recordTitle:{
    marginTop:10,
    fontSize:18
  }
});
