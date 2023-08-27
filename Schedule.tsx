import React, {useState, useEffect} from 'react'
import {
  FlatList,
  Button,
  Text,
  StyleSheet,
  TextInput,
  View,
  StatusBar,
} from 'react-native'
import Home from './Home'
import {firebaseDB} from './src/firebase'
import {ref, onValue, push, update, remove} from 'firebase/database'

export type Props = {
  DATA: any
  user: string
  setScreen: any
}

interface Item {
  id: string
  time: string
  callType: string
  day: string
  month: string
  onCallUid: string
  onCallName: string
}

const Schedule: React.FC<Props> = ({user, setScreen}) => {
  const [searchText, setSearchText] = useState(user)
  const [data, setData] = useState<Item[]>([])
  const [filteredData2, setFilteredData2] = useState<Item[]>([])
  // const [sched, setSched] = useState(null)
  // const callbackSetSched = (sched: React.SetStateAction<null>) =>
  // setData(sched)
  // setSched(sched)
  // let uid = auth.currentUser?.uid
  // useEffect(() => {
  //     getSchedule(callbackSetSched)
  //     }, [])
  // setSched(sched)
  useEffect(() => {
    // getSchedule(callbackSetSched);
    // setFilteredData2(data);
    // console.log("als " , sched)
    // if (uuid){
    const dataFromSnapshot: Item[] = []

    return onValue(ref(firebaseDB, '/Schedule/'), snapshot => {
      for (let key in snapshot.val()) {
        // console.log(key + ':', snapshot.val()[key])
        let item = snapshot.val()[key]
        dataFromSnapshot.push({
          id: key,
          time: item.time,
          callType: item.callType,
          day: item.day,
          month: item.month,
          onCallUid: item.onCallUid,
          onCallName: item.onCallName,
        })
      }
      setData(dataFromSnapshot)
      const defaultFiltered = dataFromSnapshot.filter(
        item => item.onCallName.includes(searchText),
        // item.onCallUid.includes(searchText),
      )
      setFilteredData2(defaultFiltered)
    })
  }, [searchText])

  const getdb = () => {
    push(ref(firebaseDB, '/users'), {
      uuid: false,
      title: 'test',
    })
  }

  // let uid = auth.currentUser?.uid
  // useEffect(() => {
  //     getSchedule(callbackSetSched)
  // }, [])

  // const getMonthName = (monthNumber: string) => {
  //   const date = new Date()
  //   date.setMonth(parseInt(monthNumber) - 1)
  //
  //   return date.toLocaleString('en-US', {month: 'long'})
  // }
  // let filteredSched: any= []
  // if (sched && user){
  //     for(let key in sched) {
  //       console.log(key + ":", sched[key]);
  //       let item = sched[key]
  //       if (item.onCall == user) {
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
  //     // DATA = filteredSched
  // }
  // console.log('from ', data)

  const handleSearch = (text: string) => {
    setSearchText(text)

    const filtered = data.filter(
      (item: any) =>
        item.onCallName.toLowerCase().includes(text.toLowerCase()) ||
        // item.onCallUid.toLowerCase().includes(text.toLowerCase()) ||
        item.day.toLowerCase().includes(text.toLowerCase()) ||
        item.month.toLowerCase().includes(text.toLowerCase()) ||
        item.callType.toLowerCase().includes(text.toLowerCase()),
    )
    // setFilteredData(filtered)
    setFilteredData2(filtered)
  }

  useEffect(() => {
    setScreen('Home')
  }, [])

  // const [filteredData, setFilteredData] = useState([DATA])

  const renderItem = ({item}: {item: any}) => (
    <Home
      time={item.time}
      callType={item.callType}
      day={item.day}
      month={item.month}
      id={item.id}
      onCallName={item.onCallName}
    />
  )

  const schedScreen = () => {
    return (
      <View>
        <StatusBar />
        <Button title='Add' onPress={getdb} />

        <TextInput
          style={styles.searchInput}
          placeholder='Search...'
          value={searchText}
          onChangeText={handleSearch}
        />
        <FlatList
          data={filteredData2}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    )
  }

  // const loading = () => {
  //       return(
  //           <View>
  //           <Text> Loading </Text>
  //           </View>
  //       )
  //   }

  return <View>{schedScreen()}</View>
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

export default Schedule
