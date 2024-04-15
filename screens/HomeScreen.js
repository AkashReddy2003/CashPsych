import { FlatList, Image, PermissionsAndroid, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native'
import React, { useContext, useState,useEffect } from 'react'
import AuthContext from '../context/AuthContext'
import {PieChart} from 'react-native-gifted-charts';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import {Dialog,Button} from 'react-native-paper';
var RNFS = require('react-native-fs');
import XLSX from 'xlsx';
const HomeScreen = ({navigation}) => {
    const [category,setCategory]=useState("All");
    const showDialog = () => setVisible(true);
    const [visible, setVisible] = React.useState(false);
    const hideDialog = () => setVisible(false);

    const {user,setLoad,deleteTransaction,col,bac,setCol,setBac,logout}=useContext(AuthContext);
    
    const data=[ {value:Number(user.income)-Number(user.expense),color:"#A8DF8E"},  {value:Number(user.expense),color:"#FF6464"} ];
    
    const catImgs={
        All:require("../assets/img/All.png"),
        Food:require("../assets/img/Food.png"),
        Health:require("../assets/img/Health.png"),
        Fashion:require("../assets/img/Fashion.png"),
        Travel:require("../assets/img/Travel.png"),
        Other:require("../assets/img/Other.png"),
        Entertainment:require("../assets/img/Entertainment.png"),
        Rent:require("../assets/img/Rent.png"),
        Income:require('../assets/img/income.png')
    }
    


    const [da,setDa]=useState([]);
    const [filterData,setFilterData]=useState([]);
    useEffect(() => {
        let x=user.transactions?user.transactions:[];
        setDa(x);
        setFilterData(x);
      }, [user]);
     
      
    const changeCategory=(c)=>{
        setCategory(c);
        let d=c!="All"?da.filter((x)=>x.category==c):da;
        setFilterData(d);
        


    }
 
    const exportDataToExcel = async () => {
      try {
        const ws = XLSX.utils.json_to_sheet(user.transactions);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' });
    
        // Save the Excel file to device storage
        const filePath = `/storage/emulated/0/Download/transactions.xlsx`;
        await RNFS.writeFile(filePath, wbout, 'ascii');
        ToastAndroid.show('File saved:'+filePath,ToastAndroid.SHORT)
        
        return filePath;
      } catch (error) {
        ToastAndroid.show('Error exporting data to Excel:',ToastAndroid.SHORT)
        return null;
      }
    };
    

    const handleExport = async () => {

      try{
        // Check for Permission (check if permission is already given or not)
        let isPermitedExternalStorage = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
  
        if(!isPermitedExternalStorage){
  
          // Ask for permission
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            
          );
  
          
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // Permission Granted (calling our exportDataToExcel function)
            exportDataToExcel()
            console.log("Permission granted");
          } else {
            // Permission denied
           
            console.log("Permission denied");
          }
        }else{
           // Already have Permission (calling our exportDataToExcel function)
          exportDataToExcel()
        }
      }catch(e){
        console.log('Error while checking permission');
        console.log(e);
        return
      }
      
    };
  return (
    <View style={{flex:1,backgroundColor:bac}}>
      
      
        <ScrollView style={{padding:20}}>
          <View style={{flexDirection:"row",justifyContent:"flex-end",marginRight:50}}>
          <TouchableOpacity style={{alignSelf:"center",backgroundColor: "#FFAF45",padding:15,borderRadius: 20,elevation:5,marginRight:10,marginLeft:5}} onPress={()=>handleExport()}>
        <Icon1 name="file-excel-o" size={25} color="black"/>
      </TouchableOpacity>
      <TouchableOpacity style={{alignSelf:"center",backgroundColor: "#FFAF45",padding:15,borderRadius: 20,elevation:5}} onPress={()=>showDialog()}>
        <Icon name="logout" size={25} color="black"/>
      </TouchableOpacity>
          </View>
        
        <TouchableOpacity style={{position:"absolute",right:-5,top:0,}} onPress={()=>{
        console.log("pressed")
        if(bac=="black"){
          setBac("white");
          setCol("black");
        }else{
          setBac("black");
          setCol("white")
        }
      }}>
      <Image source={bac=="white"?require('../assets/img/light.png'):require('../assets/img/dark.png')} style={{height:50,width: 50,}}/>
      </TouchableOpacity>
         
      <View style={{flexDirection:"row",marginBottom:20,justifyContent:"space-between"}}>
        <View style={{marginLeft:10}}>
        <Text style={{fontSize: 40,color:col}}>Hello,</Text>
        <Text style={{fontSize: 40,fontWeight:'900',color:col}}>{user.name}</Text>
        </View>
        <View style={{marginRight:20,marginTop:20}}>
        <View style={{flexDirection:"row"}}>
            <View style={{width:5,backgroundColor:"#003C43",height:28,marginRight:10}}></View>
            <Text style={{fontSize:20,fontWeight:'600',color:col}}>Balance</Text>
        </View>
        <Text style={{fontSize:35,fontWeight:"800",marginLeft:10,color:col}}>₹{Number(user.income)-Number(user.expense)}</Text>
        </View>
        

      </View>

      <View style={{height:250,width:"100%",elevation:5,backgroundColor:bac=="black"?bac:"#FFAF45",borderRadius: 20,}}>
        <View style={{padding:20}}>
            <View style={{flexDirection:"row"}}>
                <View>

                <View style={{flexDirection:"row"}}>
            <View style={{width:5,backgroundColor:"#A8DF8E",height:28,marginRight:10}}></View>
            <Text style={{fontSize:20,fontWeight:'600',color:col}}>Income</Text>
        </View>
        <Text style={{fontSize:35,fontWeight:"800",marginLeft:10,color:col}}>₹{Number(user.income)}</Text>
        <View style={{flexDirection:"row",marginTop:25}}>
            <View style={{width:5,backgroundColor:"#FF6464",height:28,marginRight:10}}></View>
            <Text style={{fontSize:20,fontWeight:'600',color:col}}>Spent</Text>
        </View>
        <Text style={{fontSize:35,fontWeight:"800",marginLeft:10,color:col}}>₹{Number(user.expense)}</Text>
                </View>

                <View style={{justifyContent:"center",marginLeft:50}}>
                <PieChart
                
                
               radius={70}
        donut
        innerRadius={40}
        data={data}
        centerLabelComponent={() => {
          return <Text style={{fontSize: 25,fontWeight:"700",color:"black"}}>{Math.floor(((Number(user.income)-Number(user.expense))/Number(user.income))*100)}%</Text>;
        }}
      />
                   
                </View>
            </View>
            
        
        </View>
        

      </View>
      <View style={{marginTop:20,marginLeft:10}}>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <Text style={{fontSize: 25,fontWeight:'700',color:col}}>Categories</Text>
       
        
        </View>
        <FlatList
        style={{paddingBottom:20}}
        showsHorizontalScrollIndicator={false}
        data={user.categories}
        horizontal
        renderItem={({item})=>
            <TouchableOpacity style={{height:160,width:120,elevation:5,backgroundColor:item.name==category?"#FFAF45":bac,borderRadius: 20,marginRight:7,marginLeft:7,marginBottom:10}} onPress={()=>changeCategory(item.name)}>
                <View style={{ padding:5,margin:10,borderRadius:10,backgroundColor:"white",width: 50,elevation:5}}>
                <Image source={catImgs[item.name]} style={{width: 40,height: 40,}}/>
                </View>
                <Text style={{marginLeft:20,fontSize:15,fontWeight:'600',marginRight:5,color:col}}>{item.name}</Text>
                <Text style={{marginLeft:20,fontSize:20,fontWeight:'800',marginRight:5,marginTop:5,color:col}}>₹{item.total}</Text>
                
            </TouchableOpacity>
        }/>
        
      </View>
      {filterData.length!=0?
      <View style={{marginTop:20,}}>
      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:10,marginLeft:10}}>
      <Text style={{fontSize: 25,fontWeight:'700',color:col}}>Recent</Text>
      
      
      </View>
      <FlatList
      style={{marginBottom:120}}
      showsHorizontalScrollIndicator={false}
      data={[...filterData].reverse().slice(0,5)}
     
      renderItem={({item})=>
          <View style={{height:90,width:"95%",elevation:5,backgroundColor:bac,borderRadius: 20,marginRight:10,marginLeft:12,marginBottom:12,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
              <View style={{ padding:5,margin:10,borderRadius:10,backgroundColor:"white",width: 50,elevation:5,height:50,marginLeft:10}}>
              <Image source={catImgs[item.category]} style={{width: 40,height: 40,}}/>
              </View>
              <View style={{width:150}}>
              <Text style={{marginLeft:20,fontSize:20,fontWeight:'800',marginRight:5,color:col}}>{item.name}</Text>
              <Text style={{marginLeft:20,fontSize:12,fontWeight:'800',marginRight:5,color:col}}>{new Date(item.Date).toDateString()==new Date().toDateString()?"Today "+new Date(item.Date).toTimeString().substring(0,5):new Date(item.Date).toString().substring(0,21)}</Text>
                  </View>
                  <View style={{marginRight:20,alignItems:"center",width: 120,}}>
                  <Text style={{marginLeft:20,fontSize:20,fontWeight:'800',marginRight:5,color:item.type=='Expense'?"#FF6464":"#A8DF8E"}}>{item.type=="Expense"?"-":"+"}₹{item.price}</Text>
                  <Text style={{marginLeft:20,fontSize:12,fontWeight:'800',marginRight:5,color:col}}>{item.mode.toUpperCase()}</Text>
                  
                  </View>
                
                  
              
              
          </View>
      }/>
      
    </View>
      :<Text style={{fontSize: 20,fontWeight:"700",alignSelf:"center"}}>No Transactions yet</Text>}
     
      </ScrollView>
      <Dialog visible={visible} onDismiss={hideDialog} style={{backgroundColor:"white"}}>
    <Dialog.Icon icon="alert"/>
        <Dialog.Title style={{alignSelf:"center",color:"#FF6464"}}>Logout</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium" style={{alignSelf:"center",fontSize:15,color:"black"}}>Are you sure?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          
          <Button onPress={hideDialog}><Text style={{color:"#FF6464"}}>Cancel</Text></Button>
          <Button onPress={()=>{
            hideDialog();
            logout();
          }} ><Text style={{color:"#A8DF8E"}}>Confirm</Text></Button>
        </Dialog.Actions>
      </Dialog>

    
      
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})