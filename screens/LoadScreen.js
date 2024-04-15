import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const LoadScreen = () => {
  return (
    <View style={{flex:1,backgroundColor:"#fff8c3",justifyContent:"center",alignItems:"center"}}>
      <Image source={require("../assets/img/load.gif")} style={{width: 300,height: 300,}}/>
    </View>
  )
}

export default LoadScreen

const styles = StyleSheet.create({})