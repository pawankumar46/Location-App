import { View, Text } from 'react-native'
import React from 'react'
import Location1 from './Location1'
import Maps from './Maps'
import {  NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
 

const Tab = createBottomTabNavigator()
const RootNavigator = () => {
  return (
   <NavigationContainer>
       <Tab.Navigator>
           <Tab.Screen  name='location' component={Location1}  options={{title :"Location-Manager"}} />
           <Tab.Screen  name='Maps-View' component={Maps}/>
       </Tab.Navigator>
   </NavigationContainer>
  )
}

export default RootNavigator