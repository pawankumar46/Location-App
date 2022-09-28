import { View, StyleSheet, Text} from 'react-native'
import React ,{useState} from 'react'

import MapView ,{Circle, Marker} from 'react-native-maps'
import { useSelector } from 'react-redux'


const Maps = () => {
  const single = useSelector((state: any)=>{
    return state.single
 })

  return (
    <View  style={styles.container}>
    <MapView
        style={styles.map}
        initialRegion={{
          latitude : single.lat,
          longitude : single.log,
          latitudeDelta : single.latitudeDelta,
          longitudeDelta : single.longitudeDelta
        }}
      >
        <Marker  coordinate={
          { latitude : single.lat,
           longitude : single.log}
        } />
        <Circle center={{latitude : single.lat , longitude : single.log}} radius={1000}/>
        </MapView>
     
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: 450,
    height: 900
  },
})

export default Maps