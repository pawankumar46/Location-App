import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React  from 'react'

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import RootNavigator from './Components/RootNavigator';



 const store = configureStore()
   
  console.log(store.getState())
  store.subscribe(()=>{
    console.log('store' , store.getState())
  })
export default function App() {
   
  return (
     <Provider store={store}>
    <View style={styles.container} >
   
       <RootNavigator/>
      <StatusBar style="auto" backgroundColor='beige'/>
    </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  heading : {
    marginTop : 50,
    marginLeft : 20,
    fontSize  : 20,
    fontWeight : "bold",
 
 }
});
