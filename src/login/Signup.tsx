import React, {useState} from 'react'
import {createUserWithEmailAndPassword, UserCredential} from 'firebase/auth'
import {TextInput, View, Text, TouchableOpacity, Button} from 'react-native'

import {auth} from '../firebase'
import styles from './Style'
import {addUser} from '../utils/dbUtils'

export type Props = {
  setScreen: any
}

const Signup: React.FC<Props> = ({setScreen}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [classType, setClassType] = useState('')
  const [error, setError] = useState<String | null>(null)
  let uuid: UserCredential | null = null

  const createAccount = async () => {
    try {
      uuid = await createUserWithEmailAndPassword(auth, email, password)
    } catch (e) {
      setError('There was a problem creating your account' + e)
    } finally {
      if (uuid) {
        try {
          addUser(uuid.user.uid, email, firstName, lastName, classType)
        } catch (e) {
          setError('There was a problem creating your account' + e)
        }
      }
    }
  }

  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Text style={styles.header}>Signup</Text>

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity onPress={() => setScreen('login')}>
          <Text style={styles.link}>Login to existing account</Text>
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
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          placeholder='Enter first name'
          autoCapitalize='none'
          placeholderTextColor='#aaa'
          style={styles.input}
        />

        <TextInput
          value={lastName}
          onChangeText={setLastName}
          placeholder='Enter last name'
          autoCapitalize='none'
          placeholderTextColor='#aaa'
          style={styles.input}
        />

        <TextInput
          value={classType}
          onChangeText={setClassType}
          placeholder='Enter class'
          autoCapitalize='none'
          placeholderTextColor='#aaa'
          style={styles.input}
        />

        <Button
          title='Create Account'
          onPress={createAccount}
          disabled={
            !email || !password || !firstName || !lastName || !classType
          }
        />
      </View>
    </View>
  )
}

export default Signup
