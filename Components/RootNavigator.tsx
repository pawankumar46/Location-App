import { View, Text } from 'react-native'
import React from 'react'
import Location1 from './Location1'
import Maps from './Maps'
import {  NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()
const RootNavigator = () => {
  return (
   <NavigationContainer>
       <Tab.Navigator>
           <Tab.Screen  name='location' component={Location1}  options={{title :"Location-Manager" , tabBarIcon : ({}) =>( 
              <Entypo name="location" size={24} color="black" />
           ) }}  />
           <Tab.Screen  name='Maps-View' component={Maps} options={{ tabBarIcon : ({})=> (
              <FontAwesome5 name="map-marked-alt" size={24} color="black" />
           )}}/>
       </Tab.Navigator>
   </NavigationContainer>
  )
}

export default RootNavigator