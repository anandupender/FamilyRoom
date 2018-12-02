import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import { Card } from "react-native-elements";

const { width } = Dimensions.get('window');
const height = width * 0.8;

const data = [
  { topic: "Moving" },
  { topic: "New Jobs" },
  { topic: "Marriage" },
  { topic: "Life Advice" },
  { topic: "Jealousy" },
  { topic: "War Time" }
];

export default class ProfileScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      data: data,
    }
  }

  _goToTopic = (currTopic) => {
    this.props.navigation.navigate("Topic", { topic: currTopic });
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.category}>
          <View style={styles.categoryImage}>
          </View>

          <Text style={styles.categoryTitle}> Baji's Records </Text>
        </View>



        <View style={styles.allRecords}>
          <FlatList
            numColumns={2}
            data={this.state.data}
            renderItem={({ item: rowData }) => {
              return (
                <TouchableOpacity onPress={() => this._goToTopic(rowData.topic)} style={styles.recordContainer}>
                  <View style={styles.record}>
                  </View>
                  <Text style={styles.recordTitle}> {rowData.topic} </Text>
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
    width: 200,
    height: 100,
    borderWidth: 3,
    backgroundColor: '#71f2e1',
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
    borderWidth: 2,
    borderRadius: 150/2,
    margin: 15,
    marginBottom: 0,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  recordTitle:{
    fontSize:18
  }
});
