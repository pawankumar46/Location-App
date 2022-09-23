import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React  from 'react'
import Location from './Components/Location';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

 const store = configureStore()
   
  console.log(store.getState())
  store.subscribe(()=>{
    console.log('store' , store.getState())
  })
export default function App() {
   
  return (
     <Provider store={store}>
    <View style={styles.container}>
    <Text style={styles.heading}>Location-App</Text>
       <Location />
      <StatusBar style="auto" backgroundColor='beige'/>
    </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading : {
    marginTop : 100,
    textAlign : 'center',
    fontSize  : 20,
    fontWeight : "bold",
 
 }
});
