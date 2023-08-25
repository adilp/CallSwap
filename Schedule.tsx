import React, {useState, useEffect} from 'react'
import {FlatList, StyleSheet, TextInput, View, StatusBar} from 'react-native'
import Home from './Home'
import type { Card } from './App'

export type Props = {
  DATA: any
  setScreen: any
}

const Schedule: React.FC<Props> = ({DATA, setScreen}) => {
  const handleSearch = (text: string) => {
    setSearchText(text)

    const filtered = DATA.filter(
      (item: any) =>
        item.day.toLowerCase().includes(text.toLowerCase()) ||
        item.month.toLowerCase().includes(text.toLowerCase()) ||
        item.callType.toLowerCase().includes(text.toLowerCase()),
    )

    setFilteredData(filtered)
  }

  useEffect(() => {
    setScreen('Home')
  }, [])

  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState(DATA)

  const renderItem = ({item}: {item: Card}) => (
    <Home
      time={item.time}
      callType={item.callType}
      day={item.day}
      month={item.month}
      id={item.id}
    />
  )
  return (
    <View>
      <StatusBar />

      <TextInput
        style={styles.searchInput}
        placeholder='Search...'
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
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

export default Schedule
