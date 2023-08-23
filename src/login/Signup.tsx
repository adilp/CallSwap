import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Button
  } from 'react-native';

import { auth } from '../firebase';
import styles from './Style';

export type Props = {
  setScreen: any;
};

const Signup: React.FC<Props> = ({setScreen}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<String | null>(null);

  const createAccount = async () => {
    try {
      if (password === confirmPassword) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        setError("Passwords don't match");
      }
    } catch (e) {
      setError('There was a problem creating your account');
    }
  };
  return(
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
          keyboardType="email-address"
          placeholder="Enter email address"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Enter password"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholder="Confirm password"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />

        <Button
          title="Create Account"
          onPress={createAccount}
          disabled={!email || !password || !confirmPassword}
        />
      </View>
    </View>
    )
}

export default Signup;
