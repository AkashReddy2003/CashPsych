import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from './WelcomeScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import AuthContext from '../context/AuthContext';
import HomeScreen from './HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import ChartScreen from './ChartScreen';
import AddScreen from './AddScreen';
import LoadScreen from './LoadScreen';
import TransactionsScreen from './TransactionsScreen';



const MainScreen = () => {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
    
    const {Auth,load,setLoad}=useContext(AuthContext);
    
  return (
    <>
    {load?<LoadScreen/>:
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown:false}}>
      
      {Auth?
      <>
      <Stack.Screen name='home' >
        {()=> <Tab.Navigator 
        screenOptions={{headerShown:false,
        tabBarStyle:{position:"absolute",bottom:25,right: "20%",left:"20%",borderRadius: 30,height:60},
        tabBarShowLabel:false,
        tabBarActiveTintColor:"#007F73",
       
        }}>
        <Tab.Screen name="homeScreen" component={HomeScreen} 
        options={{tabBarIcon:({color,size})=>{return color=="#007F73"?<Icon name="home" size={size} color={"white"} style={{borderRadius:25,backgroundColor:"#003C43",padding: 10,}} />:<Icon name="home-outline" size={size} color={"grey"} style={{borderRadius:25,}} />}}} />
        <Tab.Screen name="addScreen" component={AddScreen} 
         options={{tabBarIcon:({color,size})=>{return color=="#007F73"?<Icon name="add-circle" size={size} color={"white"} style={{borderRadius:25,backgroundColor:"#003C43",padding: 10,}} />:<Icon name="add-circle-outline" size={size} color={"grey"} style={{borderRadius:25,}} />}}} />
          <Tab.Screen name="TransactionScreen" component={TransactionsScreen} 
         options={{tabBarIcon:({color,size})=>{return color=="#007F73"?<Icon name="list" size={size} color={"white"} style={{borderRadius:25,backgroundColor:"#003C43",padding: 10,}} />:<Icon name="list-outline" size={size} color={"grey"} style={{borderRadius:25,}} />}}} />
        <Tab.Screen name="chartScreen" component={ChartScreen} 
         options={{tabBarIcon:({color,size})=>{return color=="#007F73"?<Icon name="bar-chart" size={size} color={"white"} style={{borderRadius:25,backgroundColor:"#003C43",padding: 10,}} />:<Icon name="bar-chart-outline" size={size} color={"grey"} style={{borderRadius:25,}} />}}} />
        </Tab.Navigator>}

      </Stack.Screen>
      <Stack.Screen name='transaction' component={TransactionsScreen}/>
      </>
      :
      <>
      <Stack.Screen component={WelcomeScreen} name='welcome'/>
      <Stack.Screen component={LoginScreen} name='login'/>
      <Stack.Screen component={SignupScreen} name='signup'/></>}
      


    </Stack.Navigator>
    
  </NavigationContainer>
        }
    </>
    
  )
}

export default MainScreen