import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image} from 'react-native';

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
          <Image style={styles.categoryImage} source={require('../../assets/images/mina.jpg')}/>

          <Text style={styles.categoryTitle}> Baji's Records </Text>
        </View>



        <View style={styles.allRecords}>
          <FlatList
            numColumns={2}
            data={this.state.data}
            renderItem={({ item: rowData }) => {
              return (
                <TouchableOpacity onPress={() => this._goToTopic(rowData.topic)} style={styles.recordContainer}>
                  <Image style={styles.record} source={require('../../assets/images/record.png')}/>
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
    borderWidth: 2,
    borderRadius: 150/2,
    margin: 15,
    marginBottom: 0,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  recordTitle:{
    marginTop:10,
    fontSize:18
  }
});
