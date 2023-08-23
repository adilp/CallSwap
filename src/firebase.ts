import * as firebase from "firebase/app";
import { getAuth } from 'firebase/auth';

let keys = require('../firebase.json');

console.log("Keys " , keys);

const firebaseConfig = {
  apiKey: keys.apiKey,
  authDomain: keys.authDomain,
  projectId: keys.projectId,
  storageBucket: keys.storageBucket,
  messagingSenderId: keys.messagingSenderId,
  appId: keys.appId,
  measurementId: keys.measurementId
}
firebase.initializeApp(firebaseConfig);
export const auth = getAuth();

