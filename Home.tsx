import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export type Card = {
  time: string;
  callType: string;
  day: string;
  month: string;
};


const Home: React.FC<Card> = ({time, callType, day, month}
) => {
  const handleCardPress = () => {
    Alert.alert(
      'Swap this call?',
      // `Title: ${title}\nTime: ${time}\nLocation: ${location}`,
      `Confirming will send an alert to all eligible users?\n`,
      [{
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
        { text: 'Confrim', onPress: () => console.log('OK Pressed') }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.section1}>
        <TouchableOpacity onPress={handleCardPress} style={styles.block}>
        <View style={styles.date}>
          <Text style={styles.day}>
          {day}
          </Text>
          <Text style={styles.month}>
          {month}
          </Text>
          </View>
          <View style={styles.shift}>
          <Text style={styles.shiftText}>
          {callType}
          </Text>
          <Text style={styles.shiftTime}>
          {time}
          </Text>
          </View>
        </TouchableOpacity >
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
  date: {
    alignItems: 'center',
    justifyContent: 'center',
    marginStart: "10%"
  },
  day: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  month: {
    fontSize: 16,
    color: '#888888',
    marginBottom: 4,
  },
  shiftText: {
    fontSize: 26,
  },
  shiftTime: {
    color: '#888888',
  },
  shift: {
    alignItems: 'center',
    justifyContent: 'center',
    marginStart: "10%"

  },
  upcoming: { 
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    // shadowRadius: 10,
    padding: 10,
    margin: 5,
  },
  block: {
    width: "80%",
    alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    padding: 10,
    margin: 20,
    },
    container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  section1: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  section2: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    // backgroundColor: 'green',
    backgroundColor: '#fff',
  },
  section3: {
    flex: 1,
    backgroundColor: 'blue',
  },
});

export default Home;


 

