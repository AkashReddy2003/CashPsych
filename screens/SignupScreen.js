import { StyleSheet, Text, View,ScrollView,TouchableOpacity,Image, ToastAndroid } from 'react-native'
import React, { useContext, useState } from 'react'
import { TextInput,Dialog } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import AuthContext from '../context/AuthContext';
const SignupScreen = ({navigation}) => {
  const {signup}=useContext(AuthContext);
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [rePassword,setRePassword]=useState("");
 
  const submit=()=>{
    console.log(email,password,rePassword)
    if(password!=rePassword){
     ToastAndroid.show("Passwords don't match",ToastAndroid.SHORT);
    }else{
      signup(name,email,password);
    }
  }
  return (
    <ScrollView style={{flex:1,backgroundColor:"#007F73",paddingTop:20}}>
      <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Icon name="left" size={30} color="white"style={{marginLeft: 20}}/>
      </TouchableOpacity>
      <Text style={{width:"90%",color:"white",fontWeight:"900",fontSize:130,textAlign:"justify",lineHeight:130,paddingTop:20,alignSelf:"center"}}>
        Sign
        
      </Text>
      <Text style={{width:"90%",color:"white",fontWeight:"900",fontSize:130,textAlign:"justify",lineHeight:130,alignSelf:"center"}}>
        up
        
      </Text>
      <Image source={require("../assets/img/pineapple.png")} style={{position:'absolute',top:190,left:150,width:100,height:100}}/>
      
      <View style={{padding:20,marginTop:10}}>
      <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
          <Icon name="user" size={30} color="white" style={{marginRight: 5,}}/>
          <TextInput
          value={name}
        mode='outlined'
        style={{backgroundColor:"#007F73",width:'90%'}}
        label={<Text style={{color:"white",fontWeight:"700"}}>Name</Text>}
        outlineColor='white'
        activeOutlineColor='white'
        textColor='white'
        onChangeText={(x)=>setName(x)}
        />
        </View>
        <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:25}}>
          <Icon name="mail" size={30} color="white" style={{marginRight: 5,}}/>
          <TextInput
          value={email}
        mode='outlined'
        style={{backgroundColor:"#007F73",width:'90%'}}
        label={<Text style={{color:"white",fontWeight:"700"}}>Email</Text>}
        outlineColor='white'
        activeOutlineColor='white'
        textColor='white'
        onChangeText={(x)=>setEmail(x)}
        />
        </View>
        <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:25}}>
          <Icon name="lock" size={30} color="white" style={{marginRight: 5,}}/>
          <TextInput
        mode='outlined'
        style={{backgroundColor:"#007F73",width:'90%'}}
        label={<Text style={{color:"white",fontWeight:"700"}}>Password</Text>}
        outlineColor='white'
        activeOutlineColor='white'
        textColor='white'
        value={password}
        onChangeText={(x)=>setPassword(x)}
        />
        </View>
        <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:25}}>
          <Icon name="lock" size={30} color="white" style={{marginRight: 5,}}/>
          <TextInput
        mode='outlined'
        style={{backgroundColor:"#007F73",width:'90%'}}
        label={<Text style={{color:"white",fontWeight:"700"}}>Re-type Password</Text>}
        outlineColor='white'
        activeOutlineColor='white'
        textColor='white'
        value={rePassword}
        onChangeText={(x)=>setRePassword(x)}
        />
        </View>
 
        
      
      </View>
    <View style={{marginTop:20}}>
    <View>
    <TouchableOpacity style={{paddingLeft:50}} onPress={submit}>
        <Text style={{fontSize:40,fontWeight:"700",color:"white"}}>Signup</Text>
        <View style={[styles.line,{backgroundColor:"#FFAF45"}]}></View>
    </TouchableOpacity>
    
       
    </View>
   
    </View>
    
      
    </ScrollView>
  )
}

export default SignupScreen

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