/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './src/firebase';
import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  Button,
  View,
  TextInput,
  StatusBar,
  StyleSheet,
  FlatList,
} from 'react-native';

import Home from './Home';
import LoginScreen from './src/login/LoginScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;


function App(): JSX.Element {

interface Card {
  id: number,
  time: string;
  callType: string;
  day: string;
  month: string;
}

const DATA: Card[] = [
  {
    id: 1,
    time: "10:00pm - 7:00am",
    callType: 'Short Call',
    day: '18',
    month: 'January',
  },
  {
    id: 2,
    time: "08:00pm - 2:00am",
    callType: 'Weekend Call',
    day: '10',
    month: 'Febrary',
  },
  {
    id: 3,
    time: "07:30pm - 1:30am",
    callType: 'Short Call',
    day: '12',
    month: 'Febrary',
  },
  {
    id: 4,
    time: "04:00pm - 3:00am",
    callType: 'Weekend Call',
    day: '28',
    month: 'March',
  },
  {
    id: 5,
    time: "12:00pm - 2:00pm",
    callType: 'Regular Call',
    day: '13',
    month: 'April',
  },
  {
    id: 6,
    time: "04:00pm - 3:00am",
    callType: 'Weekend Call',
    day: '18',
    month: 'May',
  },
  {
    id: 7,
    time: "12:00pm - 2:00pm",
    callType: 'Regular Call',
    day: '30',
    month: 'May',
  },
];
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(DATA);

  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });
  // const logout = async () => {
  //   try {
  //     await signOut(auth);
  //   } catch (e) {
  //     console.error(e);
  //   }

const logout = async () => {
    console.log("Logout");
    try {
        await signOut(auth);
      } catch (e) {
          console.error(e);
        }
  }
const getScreen = () => {
    if (loggedIn) {
      return (
          <View>
            <StatusBar />
            <Button title="Log out" onPress={logout} />

            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchText}
              onChangeText={handleSearch}
            />
            <FlatList
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
            </View>
      )
     };
    // if (screen === 'signup') {} return <Signup setScreen={setScreen} />;
    // if (screen === 'reset-password') return <ResetPassword setScreen={setScreen} />;
    return (
        <View>
          <StatusBar />
          <LoginScreen />
        </View>
    );
  };

  const handleSearch = (text: string) => {
    setSearchText(text);

    const filtered = DATA.filter(
      (item) =>
        item.day.toLowerCase().includes(text.toLowerCase()) ||
        item.month.toLowerCase().includes(text.toLowerCase()) ||
        item.callType.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredData(filtered);
  };
const renderItem = ({ item }: { item: Card }) => (
  <Home time={item.time} callType={item.callType} day={item.day} month={item.month} />
);
  return (
          <SafeAreaView style={styles.safeArea}>
            {getScreen()}
          </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  sectionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  searchInput: {
    marginTop: 20,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
});

export default App;
