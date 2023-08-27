import {
  ref,
  onValue,
  get,
  push,
  update,
  set,
  remove,
  query,
  child,
  equalTo
} from 'firebase/database';
import { useState } from 'react';
import { firebaseDB } from '../firebase'

export interface addUser {
  uuid: string
  email: string
  firstname: string
  lastname: string
  class: string
}

// export const getSchedule = async (callback:any) => {
//   try {
//     onValue(ref(firebaseDB, '/Schedule'), (snapshot) => { const data = snapshot.val(); callback(data); } );
//   } catch (e) {
//     console.log(e);
//   }
// }

// export const getSchedule = async (uuid: string) => {
//   if (uuid){
//     const dbRef = query(ref(firebaseDB, '/Schedule/'))
//     return onValue(dbRef, (snapshot) => {
//       const values = Object.values(snapshot.val());
//       console.log(values);
//       return {data: values, total: values.length}
//     })
//   }
// }
// export const getSchedule = async (uuid: string | undefined) => {
//   if (uuid){
//     return onValue(ref(firebaseDB, '/Schedule/'), (snapshot) => {
//       snapshot.val()
//       // for(let key in snapshot.val()) {
//       //   console.log(key + ":", snapshot.val()[key]);
//       }
//     });
// }
// export const getSchedule = async (uuid: string | undefined) => {
//   if (uuid){
//     return onValue(ref(firebaseDB, '/Schedule/' + "alsdfkasalsdfkj"), (snapshot) => {
//       // const username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
//       console.log("Snap: " + snapshot.val().callType);
//       // ...
//     }, {
//       onlyOnce: true
//     });
//   }
// }

// export const getSchedule = async (uuid: string | undefined) => {
//   if (uuid){
//     // const userId = auth.currentUser.uid;
//     // return onValue(ref(firebaseDB, '/Schedule/' + uuid), (snapshot) => {
//     //   // const username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
//     //   console.log(snapshot.val())
//     //   // ...
//     // }, {
//     //   onlyOnce: true
//     // })
//     // const mySched = query(ref(firebaseDB, 'Schedule/'), equalTo(uuid));
//
//     // console.log()
//     //
//   }
//   else {
//     console.log("Didnt work");
//   }
// }

export const addUser = (uuid: string, email: string, firstname: string, lastname:string, classType:string) => {
    push(ref(firebaseDB, '/users/' + uuid), {
      email: email,
      firstname: firstname,
      lastname: lastname,
      class: classType
    });
}

