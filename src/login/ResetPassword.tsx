import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Button
  } from 'react-native';

import { auth } from '../firebase';
import styles from './Style';
import { SCREEN } from '../../App'

export type Props = {
  setScreen: any;
};

const ResetPassword: React.FC<Props> = ({setScreen}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<String | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const resetUserPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setSubmitted(true);
      setError(null);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        setError('User not found');
      } else {
        setError('There was a problem with your request');
      }
    }
  };

  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Text style={styles.header}>Reset Password</Text>

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity onPress={() => setScreen(SCREEN.LOGIN)}>
          <Text style={styles.link}>Back to login</Text>
        </TouchableOpacity>

        {submitted ? (
          <Text>Please check your email for a reset password link.</Text>
        ) : (
          <>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="Enter email address"
              autoCapitalize="none"
              placeholderTextColor="#aaa"
              style={styles.input}
            />

            <Button title="Reset Password" onPress={resetUserPassword} disabled={!email} />
          </>
        )}
      </View>
    </View>
  );
};

export default ResetPassword;
