import { StyleSheet, Text, TouchableOpacity, View,ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import Icon from 'react-native-vector-icons/Ionicons'
import { Image } from 'react-native'
import { FlatList } from 'react-native'
import {Dialog,Button, Chip} from 'react-native-paper';
const TransactionsScreen = () => {
    const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

    const {user,setLoad,deleteTransaction,col,bac}=useContext(AuthContext);
    const [mode,setMode]=useState("");
    const [type,setType]=useState("");
    const [cat,setCat]=useState("");
    const [data,setData]=useState([]);
    const [vis,setVis]=useState(false);
    const [del,setDel]=useState({});
    const [visible, setVisible] = React.useState(false);
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
    useEffect(()=>{
        let u=user.transactions?user.transactions:[];
        u=u.filter((i)=>(i.mode==mode||mode==""));
        u=u.filter((i)=>(i.category==cat||cat==""));
        u=u.filter((i)=>(i.type==type||type==""));
        setData(u);
        console.log(u)

    },[type,mode,cat])
  return (
   <View style={{flex:1,backgroundColor:bac}}>
   <ScrollView style={{flex:1}}>
        
        <View style={{marginBottom:10,marginTop:20}}>
        <View style={{flexDirection:"row",marginBottom:20,justifyContent:"space-between",marginLeft:20,marginRight:20,alignItems:"center"}}>
        <View style={{marginLeft:10}}>
        <Text style={{fontSize: 40,color:col}}>All</Text>
        <Text style={{fontSize: 40,fontWeight:'900',color:col}}>Transaction</Text>
        </View>
        <TouchableOpacity style={{width:80,height:80,backgroundColor:"#FFAF45",elevation:5,justifyContent:"center",alignItems:"center",borderRadius: 20,}} onPress={()=>setVis(!vis)}>
        <Icon name={vis?"checkmark":"options"} size={60} color="black" />
        </TouchableOpacity>
        
        

      </View>
    </View>
    <View style={{flexDirection: 'row',}}>
    {type!=""?
    <TouchableOpacity style={{elevation:5,height: 100,width:100,backgroundColor:"#FFAF45",marginRight:10,borderRadius: 20,marginBottom:10,marginLeft:10,alignItems:"center",justifyContent:"center"}} onPress={()=>{
        setType("");
        if(cat=="Income"){[
            setCat("")
        ]}
        }
        }>
<Image source={Imgs[type]} style={{width: 50,height: 50,}}/>
<Text style={{fontSize: 15,fontWeight:"600",marginTop:5,color:"black"}}>{type}</Text>

<Icon name="close-circle" size={25} color="red" style={{position: "absolute",top:-10,right: -2,}}/>

</TouchableOpacity>
    :""}
    {mode!=""?
    <TouchableOpacity style={{elevation:5,height: 100,width:100,backgroundColor:"#FFAF45",marginRight:10,borderRadius: 20,marginBottom:10,marginLeft:10,alignItems:"center",justifyContent:"center"}} onPress={()=>{
        setMode("");
        }
        }>
<Image source={Imgs[mode]} style={{width: 50,height: 50,}}/>
<Text style={{fontSize: 15,fontWeight:"600",marginTop:5,color:"black"}}>{mode}</Text>

<Icon name="close-circle" size={25} color="red" style={{position: "absolute",top:-10,right: -2,}}/>

</TouchableOpacity>
    :""}
    {(cat!=""&&cat!="Income")?
    <TouchableOpacity style={{elevation:5,height: 100,width:100,backgroundColor:"#FFAF45",marginRight:10,borderRadius: 20,marginBottom:10,marginLeft:10,alignItems:"center",justifyContent:"center"}} onPress={()=>{
        setCat("");
        }
        }>
<Image source={Imgs[cat]} style={{width: 50,height: 50,}}/>
<Text style={{fontSize: 15,fontWeight:"600",marginTop:5,color:"black"}}>{cat}</Text>

<Icon name="close-circle" size={25} color="red" style={{position: "absolute",top:-10,right: -2,}}/>

</TouchableOpacity>
    :""}
    </View>
    
    {vis?
    <View style={{marginLeft:30}}>
        
    <View>
    <Text style={{fontSize: 25,fontWeight: '600',marginBottom:20}}>Type</Text>
        <View style={{flexDirection:"row",width:"100%",flexWrap:"wrap"}}>
            {types.map((item)=>{
                return(
                    <TouchableOpacity style={{elevation:5,height: 100,width:100,backgroundColor:type==item.name?"#FFAF45":"white",marginRight:10,borderRadius: 20,marginBottom:10,marginLeft:10,alignItems:"center",justifyContent:"center"}} onPress={()=>{
                        if(item.name==type){
                            setType("");
                        }else{
                            if(item.name=='Income')
                        {setType(item.name);setCat("Income")}else{
                            setType(item.name)
                        }}
                        }
                        }>
                <Image source={Imgs[item.name]} style={{width: 50,height: 50,}}/>
                <Text style={{fontSize: 15,fontWeight:"600",marginTop:5,color:"black"}}>{item.name}</Text>
                {type==item.name?
                <Icon name="checkmark-circle" size={25} color="black" style={{position: "absolute",top:-10,right: -2,}}/>:""}
                
        </TouchableOpacity>
                )
            })}
        </View>
        
    </View>
    <View>
    <Text style={{fontSize: 25,fontWeight: '600',marginBottom:20,marginTop:10}}>Mode</Text>
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
                <Icon name="checkmark-circle" size={25} color="black" style={{position: "absolute",top:-10,right: -2,}}/>:""}
        </TouchableOpacity>
                )
            })}
        </View>
        
    </View>
    {type=="Expense"?
    <View>
    <Text style={{fontSize: 25,fontWeight: '600',marginBottom:20,marginTop:10}}>Category</Text>
        <View style={{flexDirection:"row",width:"100%",flexWrap:"wrap"}}>
            {categories.map((item)=>{
                return(
                    <TouchableOpacity style={{elevation:5,height: 100,width:100,backgroundColor:cat==item.name?"#FFAF45":"white",marginRight:10,borderRadius: 20,marginBottom:15,marginLeft:10,alignItems:"center",justifyContent:"center"}} onPress={()=>{
                        if(item.name==cat){
                            setCat("")
                        }else{
                            setCat(item.name)
                        }
                       }}>
                <Image source={Imgs[item.name]} style={{width: 50,height: 50,}}/>
                <Text style={{fontSize: 15,fontWeight:"600",marginTop:5,color:"black"}}>{item.name}</Text>
                {cat==item.name?
                <Icon name="checkmark-circle" size={25} color="black" style={{position: "absolute",top:-10,right: -2,}}/>:""}
        </TouchableOpacity>
                )
            })}
        </View>
        
    </View>
    :""}
    

  </View>
    : data.length!=0?
        <View style={{marginTop:20,}}>
        
        <FlatList
        style={{paddingBottom:100}}
        showsHorizontalScrollIndicator={false}
        data={[...data].reverse()}
       
        renderItem={({item})=>
            <View style={{height:90,width:"95%",elevation:5,backgroundColor:bac,borderRadius: 20,marginRight:10,marginLeft:12,marginBottom:12,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                <View style={{ padding:5,margin:10,borderRadius:10,backgroundColor:"white",width: 50,elevation:5,height:50,marginLeft:10}}>
                <Image source={Imgs[item.category]} style={{width: 40,height: 40,}}/>
                </View>
                <View style={{width:150}}>
                <Text style={{marginLeft:20,fontSize:20,fontWeight:'800',marginRight:5,color:col}}>{item.name}</Text>
                <Text style={{marginLeft:20,fontSize:12,fontWeight:'800',marginRight:5,color:col}}>{new Date(item.Date).toDateString()==new Date().toDateString()?"Today "+new Date(item.Date).toTimeString().substring(0,5):new Date(item.Date).toString().substring(0,21)}</Text>
                    </View>
                    <View style={{marginRight:20,alignItems:"center",width: 120,}}>
                    <Text style={{marginLeft:20,fontSize:20,fontWeight:'800',marginRight:5,color:item.type=='Expense'?"#FF6464":"#A8DF8E"}}>{item.type=="Expense"?"-":"+"}₹{item.price}</Text>
                    <Text style={{marginLeft:20,fontSize:12,fontWeight:'800',marginRight:5,color:col}}>{item.mode.toUpperCase()}</Text>
                    
                    </View>
                    <TouchableOpacity style={{position: "absolute",top:7,right: 6,}} onPress={()=>{showDialog();setDel(item)}}>
                    <Icon name="close-circle" size={22} color={"#FF6464"} />
                    </TouchableOpacity>
                    
                
                
            </View>
        }/>
        
      </View>
        :<Text style={{fontSize: 20,fontWeight:"700",alignSelf:"center"}}>No Transactions yet</Text>
    }
    

    </ScrollView>
    <Dialog visible={visible} onDismiss={hideDialog} style={{backgroundColor:"white"}}>
    <Dialog.Icon icon="alert"/>
        <Dialog.Title style={{alignSelf:"center",color:"#FF6464"}}>Delete the transaction</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium" style={{alignSelf:"center",fontSize:15,color:"black"}}>Are you sure?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          
          <Button onPress={hideDialog}><Text style={{color:"#FF6464"}}>Cancel</Text></Button>
          <Button onPress={()=>{
            hideDialog();
            setLoad(true);
            deleteTransaction(del);
            setDel({});
          }} ><Text style={{color:"#A8DF8E"}}>Confirm</Text></Button>
        </Dialog.Actions>
      </Dialog>

    </View>
    
      
  )
}

export default TransactionsScreen

const styles = StyleSheet.create({})