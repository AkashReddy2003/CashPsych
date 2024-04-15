import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {  useContext, useState } from 'react'
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import AuthContext from '../context/AuthContext';
const LoginScreen = ({navigation}) => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const {login,resetPassword}=useContext(AuthContext);
  return (
    <ScrollView style={{flex:1,backgroundColor:"#FFAF45",paddingTop:20}}>
      <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Icon name="left" size={30} color="white"style={{marginLeft: 20}}/>
      </TouchableOpacity>
      <Text style={{width:"90%",color:"white",fontWeight:"900",fontSize:130,textAlign:"justify",lineHeight:130,paddingTop:20,alignSelf:"center"}}>
        Log
        
      </Text>
      <Text style={{width:"90%",color:"white",fontWeight:"900",fontSize:130,textAlign:"justify",lineHeight:130,alignSelf:"center"}}>
        in
        
      </Text>
      <Image source={require("../assets/img/pineapple.png")} style={{position:'absolute',top:190,left:120,width:100,height:100}}/>
      <View style={{flexDirection:"row",justifyContent:"center"}}>
        <Image source={require("../assets/img/psych.png")} style={{width:"80%",height:100}}/>
       
      </View>
      <View style={{padding:20,marginTop:30}}>
        <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
          <Icon name="mail" size={30} color="white" style={{marginRight: 5,}}/>
          <TextInput
        mode='outlined'
        style={{backgroundColor:"#FFAF45",width:'90%'}}
        label={<Text style={{color:"white",fontWeight:"700"}}>Email</Text>}
        outlineColor='white'
        activeOutlineColor='white'
        textColor='white'
        value={email}
        onChangeText={(x)=>setEmail(x)}
        />
        </View>
        <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:25}}>
          <Icon name="lock" size={30} color="white" style={{marginRight: 5,}}/>
          <TextInput
        mode='outlined'
        style={{backgroundColor:"#FFAF45",width:'90%'}}
        label={<Text style={{color:"white",fontWeight:"700"}}>Password</Text>}
        outlineColor='white'
        activeOutlineColor='white'
        textColor='white'
        value={password}
        onChangeText={(x)=>setPassword(x)}
        />
        </View>
        
 
        
      
      </View>
    <View style={{marginTop:20}}>
    <View>
    <TouchableOpacity style={{paddingLeft:50}} onPress={()=>login(email,password)}>
        <Text style={{fontSize:40,fontWeight:"700",color:"white"}}>Login</Text>
        <View style={[styles.line,{backgroundColor:"#007F73"}]}></View>
    </TouchableOpacity>
    <TouchableOpacity  style={{paddingLeft:50,marginTop:20}} onPress={()=>resetPassword(email)}>
      <Text style={{fontSize:20,fontWeight:"600",color:"white"}}>
        Forgot Password?
      </Text>
    </TouchableOpacity>
       
    </View>
   
    </View>
      
    </ScrollView>
  )
}

export default LoginScreen

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