import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import AuthContext from '../context/AuthContext';
const AddScreen = () => {
    const {addTransaction,setLoad,col,bac}=useContext(AuthContext);
    const [name,setName]=useState("");
    const [amount,setAmount]=useState(0);
    const [category,setCategory]=useState("");
    const [mode,setMode]=useState("");
    const [type,setType]=useState("");
    const categories=[{id:1,name:"Food"},{id:2,name:"Travel"},{id:3,name:"Fashion"},{id:4,name:"Entertainment"},{id:5,name:"Rent"},{id:6,name:"Health"},{id:7,name:"Other"},];
    const modes=[{id:1,name:"Cash"},{id:2,name:"Bank"}];
    const types=[{id:1,name:"Income"},{id:2,name:"Expense"}];
    const Imgs={
        All:require("../assets/img/All.png"),
        Food:require("../assets/img/Food.png"),
        Health:require("../assets/img/Health.png"),
        Fashion:require("../assets/img/Fashion.png"),
        Travel:require("../assets/img/Travel.png"),
        Other:require("../assets/img/Other.png"),
        Entertainment:require("../assets/img/Entertainment.png"),
        Rent:require("../assets/img/Rent.png"),
        Income:require('../assets/img/income.png'),
        Income:require('../assets/img/up.png'),
        Expense:require('../assets/img/down.png'),
        Cash:require('../assets/img/cash.png'),
        Bank:require('../assets/img/bank.png')
    }
    const add=()=>{
        setLoad(true)
        if(name==""||amount==""||(category==""&&type=='income')||mode==""||type==""){
            setLoad(false)
            ToastAndroid.show("Fill all the details",ToastAndroid.SHORT);
        }else{
            addTransaction(name,amount,category,mode,type);
            setName("")
            setAmount(0)
            setCategory("")
            setMode("")
            setType("")
            
        }
       
    }
  return (
    <ScrollView style={{flex:1,backgroundColor:bac}}>
        
        <View style={{marginBottom:100,marginTop:20}}>
        <View style={{flexDirection:"row",marginBottom:20,justifyContent:"space-between",marginLeft:20,marginRight:20,alignItems:"center"}}>
        <View style={{marginLeft:10}}>
        <Text style={{fontSize: 40,color:col}}>Add</Text>
        <Text style={{fontSize: 40,fontWeight:'900',color:col}}>Transaction</Text>
        </View>
        <TouchableOpacity style={{width:80,height:80,backgroundColor:"#FFAF45",elevation:5,justifyContent:"center",alignItems:"center",borderRadius: 20,}} onPress={()=>add()}>
        <Icon name="check" size={60} color="black" />
        </TouchableOpacity>
        
        

      </View>
      <View style={{marginTop:20,marginLeft:30}}>
        <View>
            <Text style={{fontSize: 25,fontWeight: '600',color:col}}>Name</Text>
            <TextInput style={{width: "95%",backgroundColor:bac,borderColor: "white",borderWidth: bac=="black"?2:0,elevation:5,borderRadius: 10,marginTop:10,marginBottom:20,padding:10,fontSize: 20,color:col}} value={name} onChangeText={(x)=>setName(x)}/>
        </View>
        <View>
            <Text style={{fontSize: 25,fontWeight: '600',color:col}}>Amount</Text>
            <TextInput style={{width: "95%",backgroundColor:bac,borderColor: "white",borderWidth: bac=="black"?2:0,elevation:5,borderRadius: 10,marginTop:10,marginBottom:20,padding:10,fontSize: 20,color:col}} value={amount} onChangeText={(x)=>setAmount(x)}/>
        </View>
        <View>
        <Text style={{fontSize: 25,fontWeight: '600',marginBottom:20,color:col}}>Type</Text>
            <View style={{flexDirection:"row",width:"100%",flexWrap:"wrap"}}>
                {types.map((item)=>{
                    return(
                        <TouchableOpacity style={{elevation:5,height: 100,width:100,backgroundColor:type==item.name?"#FFAF45":"white",marginRight:10,borderRadius: 20,marginBottom:10,marginLeft:10,alignItems:"center",justifyContent:"center"}} onPress={()=>{
                            if(item.name==type){
                                setType("");
                            }else{
                                if(item.name=='Income')
                            {setType(item.name);setCategory("Income")}else{
                                setType(item.name)
                            }}
                            }
                            }>
                    <Image source={Imgs[item.name]} style={{width: 50,height: 50,}}/>
                    <Text style={{fontSize: 15,fontWeight:"600",marginTop:5,color:"black"}}>{item.name}</Text>
                    {type==item.name?
                    <Icon name="checkcircle" size={25} color="black" style={{position: "absolute",top:-10,right: -2,}}/>:""}
                    
            </TouchableOpacity>
                    )
                })}
            </View>
            
        </View>
        <View>
        <Text style={{fontSize: 25,fontWeight: '600',marginBottom:20,marginTop:10,color:col}}>Mode</Text>
            <View style={{flexDirection:"row",width:"100%",flexWrap:"wrap"}}>
                {modes.map((item)=>{
                    return(
                        <TouchableOpacity style={{elevation:5,height: 100,width:100,backgroundColor:mode==item.name?"#FFAF45":"white",marginRight:10,borderRadius: 20,marginBottom:10,marginLeft:10,alignItems:"center",justifyContent:"center"}} onPress={()=>{
                            if(mode==item.name){
                                setMode("");
                            }else{
                                setMode(item.name)
                            }
                            }}>
                    <Image source={Imgs[item.name]} style={{width: 50,height: 50,}}/>
                    <Text style={{fontSize: 15,fontWeight:"600",marginTop:5,color:"black"}}>{item.name}</Text>
                    {mode==item.name?
                    <Icon name="checkcircle" size={25} color="black" style={{position: "absolute",top:-10,right: -2,}}/>:""}
            </TouchableOpacity>
                    )
                })}
            </View>
            
        </View>
        {type=="Expense"?
        <View>
        <Text style={{fontSize: 25,fontWeight: '600',marginBottom:20,marginTop:10,color:col}}>Category</Text>
            <View style={{flexDirection:"row",width:"100%",flexWrap:"wrap"}}>
                {categories.map((item)=>{
                    return(
                        <TouchableOpacity style={{elevation:5,height: 100,width:100,backgroundColor:category==item.name?"#FFAF45":"white",marginRight:10,borderRadius: 20,marginBottom:15,marginLeft:10,alignItems:"center",justifyContent:"center"}} onPress={()=>{
                            if(item.name==category){
                                setCategory("")
                            }else{
                                setCategory(item.name)
                            }
                           }}>
                    <Image source={Imgs[item.name]} style={{width: 50,height: 50,}}/>
                    <Text style={{fontSize: 15,fontWeight:"600",marginTop:5,color:"black"}}>{item.name}</Text>
                    {category==item.name?
                    <Icon name="checkcircle" size={25} color="black" style={{position: "absolute",top:-10,right: -2,}}/>:""}
            </TouchableOpacity>
                    )
                })}
            </View>
            
        </View>
        :""}
        

      </View>
      <View>

      </View>
        </View>
      
    </ScrollView>
  )
}

export default AddScreen

const styles = StyleSheet.create({})