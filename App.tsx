/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {onAuthStateChanged, signOut} from 'firebase/auth'
import {auth} from './src/firebase'
import React, {useState} from 'react'
import {SafeAreaView, Button, StyleSheet} from 'react-native'

import LoginScreen from './src/login/LoginScreen'
import Schedule from './Schedule'
import Signup from './src/login/Signup'
import ResetPassword from './src/login/ResetPassword'

export interface Card {
  id: number
  time: string
  callType: string
  day: string
  month: string
}

export enum SCREEN {
  LOGIN = 'login',
  SIGNUP = 'signup',
  RESETPASSWORD = 'reset-password',
}

function App(): JSX.Element {
  const DATA: Card[] = [
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

  const callbackSetScreen = (screenName: React.SetStateAction<null>) =>
    setScreen(screenName)

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

  console.log('Screen:', screen)
  const getScreen = () => {
    if (loggedIn) {
      return <Schedule DATA={DATA} setScreen={callbackSetScreen} />
    }
    if (screen === SCREEN.SIGNUP) return <Signup setScreen={callbackSetScreen} />
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
