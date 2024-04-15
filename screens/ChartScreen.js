import {
  GestureResponderEvent,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {Canvas, Group} from '@shopify/react-native-skia';
import * as d3 from 'd3';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import BarPath from '../components/BarPath';
import XAxisText from '../components/XAxisText';
import AnimatedText from '../components/AnimatedText';
import Icon from 'react-native-vector-icons/AntDesign';
const ChartScreen = () => {
  const {user,col,bac}=useContext(AuthContext);
  const [cat,setCat]=useState("All");
  const [data,setData]=useState([]);
  const [val,setVal]=useState('day');
  const [vis,setVis]=useState(false);
  const [curWeek,setCurWeek]=useState(0)
  const [curYear,setCurYear]=useState(0)
  let dayWise=[];
  let monthWise=[];
  let yearWise=[];
  const categories=[{id:1,name:"Food"},{id:2,name:"Travel"},{id:3,name:"Fashion"},{id:4,name:"Entertainment"},{id:5,name:"Rent"},{id:6,name:"Health"},{id:7,name:"Other"},];
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
const now = new Date();
  const firstDayOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay()-7*curWeek);
  const lastDayOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (6 - now.getDay()-7*curWeek));
  const groupTransactionsByDay = (transactions) => {
    const groupedTransactions = {
      "Sun": 0,
      "Mon": 0,
      "Tue": 0,
      "Wed": 0,
      "Thu": 0,
      "Fri": 0,
      "Sat": 0
    };
  
    transactions.forEach(transaction => {
      const date = new Date(transaction.Date);
      
      const dayKey = date.toLocaleDateString('en-US', { weekday: 'short' }); // Get day name (short form)
      if(now.getFullYear()==date.getFullYear()&&transaction.type=='Expense'&&(date>=firstDayOfWeek)&&(date<=lastDayOfWeek)&&(cat=="All"||transaction.category==cat)){
        groupedTransactions[dayKey] += Number(transaction.price);
      }
      
    });
  
    // Convert groupedTransactions object to array of objects with desired format
    dayWise = Object.keys(groupedTransactions).map(day => ({
      label: day,
      value: groupedTransactions[day]
    }));   
  };


  const groupTransactionsByMonth = (transactions) => {
   
    const currentYear = now.getFullYear();
    const monthNames = [
      "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
      "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];
  
    // Initialize grouped transactions object for each month
    const groupedTransactions = {};
  
    transactions.forEach(transaction => {
      const date = new Date(transaction.Date);
      const monthKey = `${currentYear}-${(date.getMonth() + 1).toString().padStart(2, '0')}`; // Format: "YYYY-MM"
      if(new Date().getFullYear()-curYear==date.getFullYear()&&transaction.type=='Expense'&&(cat=="All"||transaction.category==cat)){
        if (!groupedTransactions[monthKey]) {
          groupedTransactions[monthKey] = 0;
        }
    
        groupedTransactions[monthKey] += Number(transaction.price);
      }
      
    });
  
    // Convert groupedTransactions object to array of objects with desired format
    monthWise = monthNames.map((monthName, index) => {
      const monthKey = `${currentYear}-${(index + 1).toString().padStart(2, '0')}`;
      return {
        label: monthName,
        value: groupedTransactions[monthKey] || 0 // Set total to 0 if no transactions for the month
      };
    });
  }

  const groupTransactionsByYear = (transactions) => {
    const groupedTransactions = {};
  
    transactions.forEach(transaction => {
      const date = new Date(transaction.Date);
      const year = date.getFullYear();
      if(transaction.type=='Expense'&&(cat=="All"||transaction.category==cat)){
        if (!groupedTransactions[year]) {
          groupedTransactions[year] = 0;
        }
    
        groupedTransactions[year] += Number(transaction.price);
      }
     
    });
  
    // Convert groupedTransactions object to array of objects with desired format
    yearWise = Object.keys(groupedTransactions).map(year => ({
      label: year,
      value: groupedTransactions[year]
    }));
  
    
  };
  const {width} = useWindowDimensions();
  const totalValue = data.reduce((acc, cur) => acc + cur.value, 0);

  const barWidth = 22;
  const graphMargin = 30;

  const canvasHeight = 350;
  const canvasWidth = width*0.9;
  const graphHeight = canvasHeight - graphMargin;
  const graphWidth = width*0.9;
  const [selsctedDay, setSelsctedDay] = useState('Total');
const selectedBar = useSharedValue(null);
const selectedValue = useSharedValue(0);
const progress = useSharedValue(0);

const xDomain = data.map((dataPoint) => dataPoint.label);
const xRange = [0, graphWidth];
const x = d3.scalePoint().domain(xDomain).range(xRange).padding(1);

const yDomain = [0, d3.max(data, (yDataPoint) => yDataPoint.value)];
const yRange = [0, graphHeight];
const y = d3.scaleLinear().domain(yDomain).range(yRange);
const touchHandler = (e) => {
  const touchX = e.nativeEvent.locationX;
  const touchY = e.nativeEvent.locationY;

  const index = Math.floor((touchX - barWidth / 2) / x.step());

  if (index >= 0 && index < data.length) {
    const {label, value} = data[index];

    if (
      touchX > x(label) - barWidth / 2 &&
      touchX < x(label) + barWidth / 2 &&
      touchY > graphHeight - y(value) &&
      touchY < graphHeight
    ) {
      selectedBar.value = label;
      setSelsctedDay(label);
      selectedValue.value = withTiming(value);
    } else {
      selectedBar.value = null;
      setSelsctedDay('Total');
      selectedValue.value = withTiming(totalValue);
    }
  }
};

  
  useEffect(()=>{
    groupTransactionsByDay(user.transactions?user.transactions:[]);
    groupTransactionsByMonth(user.transactions?user.transactions:[]);
    groupTransactionsByYear(user.transactions?user.transactions:[]);
    if(val=='day'){
      setData(dayWise);
    }else if(val=='month'){
      setData(monthWise);
    }else{
      setData(yearWise)
    }
    console.log(dayWise,monthWise,yearWise)
    progress.value = withTiming(1, {duration: 1000});
    selectedValue.value = withTiming(totalValue, {duration: 1000});
  },[progress,selectedValue,totalValue,cat,val,curWeek,curYear])
  return (
    <ScrollView style={{flex:1,backgroundColor:bac}}>
       <View style={{flexDirection:"row",marginBottom:20,marginTop:20,justifyContent:"space-between",marginLeft:20,marginRight:20,alignItems:"center"}}>
        <View style={{marginLeft:10}}>
        <Text style={{fontSize: 40,color:col}}>Expense</Text>
        <Text style={{fontSize: 40,fontWeight:'900',color:col}}>Dashboard</Text>
        </View>
        <TouchableOpacity style={{width:80,height:80,backgroundColor:"#FFAF45",elevation:5,justifyContent:"center",alignItems:"center",borderRadius: 20,}} onPress={()=>setVis(!vis)}>
        {cat!="All"?<Image source={Imgs[cat]} style={{width: 60,height: 60,}}/>:<Icon name="appstore-o" size={60} color="black" />}
        </TouchableOpacity>
        </View>
        {vis?
        <View>
        
        <View style={{flexDirection:"row",width:"100%",flexWrap:"wrap",justifyContent:"center"}}>
            {categories.map((item)=>{
                return(
                    <TouchableOpacity style={{elevation:5,height: 100,width:100,backgroundColor:cat==item.name?"#FFAF45":"white",marginRight:10,borderRadius: 20,marginBottom:15,marginLeft:10,alignItems:"center",justifyContent:"center"}} onPress={()=>{
                        if(item.name==cat){
                            setCat("All")
                        }else{
                            setCat(item.name)
                        };
                        setVis(false)
                       }}>
                <Image source={Imgs[item.name]} style={{width: 50,height: 50,}}/>
                <Text style={{fontSize: 15,fontWeight:"600",marginTop:5,color:"black"}}>{item.name}</Text>
                {cat==item.name?
                <Icon name="checkcircle" size={25} color="black" style={{position: "absolute",top:-10,right: -2,}}/>:""}
        </TouchableOpacity>
                )
            })}
        </View>
        
    </View>:""}
        
      <View style={{flexDirection:"row",margin:20,justifyContent:"space-around"}}>
        <TouchableOpacity onPress={()=>setVal("day")} style={{borderBottomLeftRadius:20,backgroundColor:val=="day"?"#FFAF45":"white",width: 120,justifyContent:"center",alignItems:"center",height:50,borderTopLeftRadius: 20,elevation:val=="day"?50:0}}><Text style={{fontSize: 20,fontWeight:'700',color:"black"}}>Daily</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>setVal("month")} style={{backgroundColor:val=="month"?"#FFAF45":"white",width: 120,justifyContent:"center",alignItems:"center",height:50,elevation:val=="month"?5:0}}><Text style={{fontSize: 20,fontWeight:'700',color:"black"}}>Monthly</Text></TouchableOpacity>

        <TouchableOpacity onPress={()=>setVal("year")} style={{borderBottomRightRadius:20,backgroundColor:val=="year"?"#FFAF45":"white",width: 120,justifyContent:"center",alignItems:"center",height:50,borderTopRightRadius: 20,elevation:val=="year"?5:0}}><Text style={{fontSize: 20,fontWeight:'700',color:"black"}}>Yearly</Text></TouchableOpacity>


      </View>
      <View style={{marginLeft:0}}>
        
      <View style={{flexDirection:"row",marginLeft:20,justifyContent:"space-between",alignItems:"center"}}>
      <Text style={{fontSize:30,fontWeight:'900',color:col}}>Expense of {selsctedDay=="Total"?(val=="day"?"the week":(val=='month'?"the year":"Total")):selsctedDay}</Text>
      <TouchableOpacity onPress={()=>{setCurWeek(0);setCurYear(0);setCat("All")}}>
        <Icon name="reload1" size={25} color={col} style={{marginRight: 20,}}/>
      </TouchableOpacity>
      </View>
      {val!="year"?
       <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-around",padding:25}}>
       <TouchableOpacity style={{width:50,height:50,backgroundColor:"#FFAF45",elevation:5,justifyContent:"center",alignItems:"center",borderTopLeftRadius: 20,borderBottomLeftRadius: 20,}} onPress={()=>val=="day"?setCurWeek(curWeek+1):setCurYear(curYear+1)}>
       <Icon name="left" size={30} color="black"/>
       </TouchableOpacity>
       <View style={{width:300,height:50,backgroundColor:"#FFAF45",elevation:0,zIndex:-1,justifyContent:"center",alignItems:"center",}}>
       <Text style={{fontSize:14,fontWeight:'900',color:col}}>{val=="day"?firstDayOfWeek.toDateString()+" to "+lastDayOfWeek.toDateString():now.getFullYear()-curYear}</Text>
       </View>
       <TouchableOpacity style={{width:50,height:50,backgroundColor:"#FFAF45",elevation:5,justifyContent:"center",alignItems:"center",borderTopRightRadius: 20,borderBottomRightRadius: 20,}} onPress={()=>val=="day"?setCurWeek(curWeek-1):setCurYear(curYear-1)}>
       <Icon name="right" size={30} color="black"/>
       </TouchableOpacity>
       </View>
      
        :""}
     <View style={{marginLeft:30}}>
     <AnimatedText selectedValue={selectedValue}/>
     </View>
     
      
      </View>
      
      <View style={{margin: 15,padding:10,backgroundColor:bac,elevation:5,borderRadius: 20,marginBottom:100}}>
      <Canvas style={{width: canvasWidth, height: canvasHeight,backgroundColor:bac}}
      onTouchStart={touchHandler}>
        {totalValue!=0?
        data.map((dataPoint, index) => (
          <Group key={index}>
            <BarPath
            progress={progress}
            x={x(dataPoint.label)}
            y={y(dataPoint.value)}
            barWidth={barWidth}
            graphHeight={graphHeight}
            label={dataPoint.label}
              selectedBar={selectedBar}
            />
            <XAxisText
              x={x(dataPoint.label)}
              y={canvasHeight}
              text={dataPoint.label}
              selectedBar={selectedBar}
              
            />
            
          </Group>
        ))
        :""}
       
      </Canvas>
      </View>
     
    </ScrollView>
  )
}


export default ChartScreen

const styles = StyleSheet.create({})