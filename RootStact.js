import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './src/Home'
import AddList from './src/AddList'
import Edite from './src/Edite'

const Stack = createStackNavigator()
export default function RootStact() {
  return (
    
        <Stack.Navigator>
            <Stack.Screen name='Make Your Day' component={Home}
             options={{title:'Make Your Day',
             headerTitleStyle:{fontWeight:'bold',color:'blue'}}}/>
            <Stack.Screen name='Add' component={AddList}
             options={{title:'Add',
             headerTitleStyle:{fontWeight:'bold',color:'blue'}}}/>
             <Stack.Screen name='Edite' component={Edite}
             options={{title:'Edite',
             headerTitleStyle:{fontWeight:'bold',color:'blue'}}}/>
        </Stack.Navigator>
     
  )
}