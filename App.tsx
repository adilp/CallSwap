/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {onAuthStateChanged, signOut} from 'firebase/auth'
import {auth} from './src/firebase'
import React, {useEffect, useState} from 'react'
import {SafeAreaView, Button, StyleSheet} from 'react-native'

import LoginScreen from './src/login/LoginScreen'
import Schedule from './Schedule'
import Signup from './src/login/Signup'
import ResetPassword from './src/login/ResetPassword'
import {firebaseDB} from './src/firebase'
import {ref, onValue, push, update, remove} from 'firebase/database'

export interface Card {
  id: number
  time: string
  callType: string
  day: string
  month: string
  onCallName: string
}

export enum SCREEN {
  LOGIN = 'login',
  SIGNUP = 'signup',
  RESETPASSWORD = 'reset-password',
}

export interface UserItem {
  class: string
  email: string
  firstName: string
  lastName: string
}

function App(): JSX.Element {
  let DATA: any = [
    {
      id: 1,
      time: '10:00pm - 7:00am',
      callType: 'Short Call',
      day: '18',
      month: 'January',
    },
    {
      id: 2,
      time: '08:00pm - 2:00am',
      callType: 'Weekend Call',
      day: '10',
      month: 'Febrary',
    },
    {
      id: 3,
      time: '07:30pm - 1:30am',
      callType: 'Short Call',
      day: '12',
      month: 'Febrary',
    },
    {
      id: 4,
      time: '04:00pm - 3:00am',
      callType: 'Weekend Call',
      day: '28',
      month: 'March',
    },
    {
      id: 5,
      time: '12:00pm - 2:00pm',
      callType: 'Regular Call',
      day: '13',
      month: 'April',
    },
    {
      id: 6,
      time: '04:00pm - 3:00am',
      callType: 'Weekend Call',
      day: '18',
      month: 'May',
    },
    {
      id: 7,
      time: '12:00pm - 2:00pm',
      callType: 'Regular Call',
      day: '30',
      month: 'May',
    },
  ]
  const [loggedIn, setLoggedIn] = useState(false)
  const [screen, setScreen] = useState(null)
  const [user, setuser] = useState<UserItem | null>(null)

  const callbackSetScreen = (screenName: React.SetStateAction<null>) =>
    setScreen(screenName)

  // const callbackSetSched = (sched: React.SetStateAction<null>) =>
  //   setSched(sched)

  onAuthStateChanged(auth, user => {
    if (user) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  })

  const logout = async () => {
    console.log('Logout')
    try {
      await signOut(auth)
    } catch (e) {
      console.error(e)
    }
  }

  let uid = auth.currentUser?.uid

  useEffect(() => {
    const dataFromSnapshot = {} as UserItem

    return onValue(ref(firebaseDB, '/users/' + uid), snapshot => {
      for (let key in snapshot.val()) {
        // console.log(key + ':', snapshot.val()[key])
        let item = snapshot.val()[key]
        // console.log("snap:", item.class)
        dataFromSnapshot.class = item.class
        dataFromSnapshot.email = item.email
        dataFromSnapshot.firstName = item.firstname
        dataFromSnapshot.lastName = item.lastname
      }
      setuser(dataFromSnapshot)
    })
  }, [loggedIn])

  // console.log('Screen:', screen)
  // console.log('Sched:', sched)
  // console.log('uid:', uid)
  //   const getMonthName = (monthNumber: string) => {
  //   const date = new Date();
  //   date.setMonth(parseInt(monthNumber) - 1);
  //
  //   return date.toLocaleString('en-US', { month: 'long' });
  // }
  // let filteredSched: any= []
  // if (sched && uid){
  //     for(let key in sched) {
  //       console.log(key + ":", sched[key]);
  //       let item = sched[key]
  //       if (item.onCall == uid) {
  //         let date = (item.date).split('/')
  //         console.log(getMonthName(date[0]))
  //         filteredSched.push(
  //           {
  //             callType: item.callType,
  //             day: date[1],
  //             month: getMonthName(date[0]),
  //             time: item.time,
  //             id: key
  //             // onCall: item.onCall
  //           }
  //         )
  //       }
  //     }
  //     DATA = filteredSched
  // }
  console.log(user);

  const getScreen = () => {
    if (loggedIn && user) {
      return <Schedule DATA={DATA} user={user.firstName + " " + user.lastName} setScreen={callbackSetScreen} />
    }
    if (screen === SCREEN.SIGNUP)
      return <Signup setScreen={callbackSetScreen} />
    if (screen === SCREEN.RESETPASSWORD)
      return <ResetPassword setScreen={callbackSetScreen} />
    return <LoginScreen setScreen={callbackSetScreen} />
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Button title='Log out' onPress={logout} />
      {getScreen()}
    </SafeAreaView>
  )
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
})

export default App
