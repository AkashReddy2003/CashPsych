import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'

const WelcomeScreen = ({navigation}) => {
  return (
    <ScrollView style={{flex:1,backgroundColor:"white",paddingTop:50}}>
     <Text style={{width:"90%",color:"#E72929",fontWeight:"900",fontSize:180,textAlign:"justify",lineHeight:150,paddingTop:20,alignSelf:"center"}}>
        Wel
        
      </Text>
      <Text style={{width:"90%",color:"#E72929",fontWeight:"900",fontSize:180,textAlign:"justify",lineHeight:150,alignSelf:"center"}}>
        com
        
      </Text>
      <Text style={{width:"90%",color:"#E72929",fontWeight:"900",fontSize:180,textAlign:"justify",lineHeight:150,alignSelf:"center"}}>
        e
        
      </Text>
      <Image source={require("../assets/img/pineapple.png")} style={{position:'absolute',top:320,left:120,width:100,height:100}}/>
      <Text style={{position:'absolute',top:400,left:220,right:5,fontWeight: '700',fontSize:20,color:"black"}}>
        
        
        <Text style={{color:"black",lineHeight:40}}>-Shawn Spencer</Text>
        

      </Text>
    <View style={{marginTop:100}}>
    <TouchableOpacity style={{paddingLeft:50}} onPress={()=>navigation.navigate("login")}>
        <Text style={{fontSize:40,fontWeight:"700",color:"black"}}>Login</Text>
        <View style={[styles.line,{backgroundColor:"#007F73"}]}></View>
      </TouchableOpacity>
      <TouchableOpacity style={{paddingLeft:50}} onPress={()=>navigation.navigate("signup")}>
        <Text style={{fontSize:40,fontWeight:"700",color:"black"}}>Register</Text>
        <View style={[styles.line,{backgroundColor:"#FFAF45",right:190}]}></View>
      </TouchableOpacity> 
    </View>
      
    </ScrollView>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    line:{
        position:"absolute",
        height:10,
        bottom:6,
        left:50,
        right: 230,
        opacity:0.7

    }
})