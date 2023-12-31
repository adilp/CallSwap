import {signInWithEmailAndPassword} from 'firebase/auth'
import React, {useState} from 'react'
import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native'
import {auth} from '../firebase'
import styles from './Style'
import { SCREEN } from '../../App'

export type Props = {
  setScreen: any
}

const LoginScreen: React.FC<Props> = ({setScreen}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<String | null>(null)

  const loginUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
      if (
        error.code === 'auth/invalid-email' ||
        error.code === 'auth/wrong-password'
      ) {
        setError('Your email or password was incorrect')
      } else if (error.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists')
      } else {
        setError('There was a problem with your request')
      }
    }
  }

  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Text style={styles.header}>Login</Text>

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity onPress={() => setScreen(SCREEN.SIGNUP)}>
          <Text style={styles.link}>Create an account</Text>
        </TouchableOpacity>

        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
          placeholder='Enter email address'
          autoCapitalize='none'
          placeholderTextColor='#aaa'
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder='Enter password'
          autoCapitalize='none'
          placeholderTextColor='#aaa'
          style={styles.input}
        />

        <TouchableOpacity onPress={() => setScreen(SCREEN.RESETPASSWORD)}>
          <Text style={[styles.link, {color: '#333'}]}>
            I've forgotten my password
          </Text>
        </TouchableOpacity>

        <Button
          title='Login'
          onPress={loginUser}
          disabled={!email || !password}
        />
      </View>
    </View>
  )
}

export default LoginScreen
