import { View, Text, ToastAndroid} from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from './FirebaseConfig';
import { get, getDatabase, push, ref, set, update } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { transition } from 'd3';

const AuthContext=createContext();
const auth=getAuth(app);
const db=getDatabase(app);
export const AuthProvider = ({children}) => {
    const [Auth,setAuth]=useState(false);
    const [user,setUser]=useState({});
    const [load,setLoad]=useState(true);
    const [col,setCol]=useState("black");
    const [bac,setBac]=useState("white");
    useEffect(()=>{
        const fetchData = async () => {
            // Simulate loading for 2 seconds
            setLoad(true)
        await AsyncStorage.getItem('user').then((u)=>{
            if(u!=undefined){
                setAuth(true);
                u=JSON.parse(u);
                setUser(u);
                
                console.log(u)
                
            }
        });
        setLoad(false)
          };
          fetchData()
        
        
    },[col,bac])
    const login=async(email,password)=>{
        setLoad(true)
        await signInWithEmailAndPassword(auth,email,password).then(async(userCredential)=>{
            
            await get(ref(db,'users/'+userCredential.user.uid)).then((x)=>{
                setAuth(true);
                setUser(x.val());
                AsyncStorage.setItem("user",JSON.stringify(x.val()));
                console.log(x.val());
                ToastAndroid.show("Success",ToastAndroid.SHORT);
            })
        }).catch((er)=>{
            ToastAndroid.show(er.message,ToastAndroid.SHORT);
            
        })
        setLoad(false)
    }
    const signup=async(name,email,password)=>{
        setLoad(true)
        await createUserWithEmailAndPassword(auth,email,password).then(async(userCredential)=>{
            console.log(userCredential.user.uid)
            await set(ref(db,'users/'+userCredential.user.uid),
        {
            name:name,
            income:0,
            expense:0,
            email:email,
            uid:userCredential.user.uid,
            categories:[{id:8,name:"All",total:0},{id:9,name:"Income",total:0},{id:1,name:"Food",total:0},{id:2,name:"Travel",total:0},{id:3,name:"Fashion",total:0},{id:4,name:"Entertainment",total:0},{id:5,name:"Rent",total:0},{id:6,name:"Health",total:0},{id:7,name:"Other",total:0},],
            
        }).catch((e)=>{
                console.log(e);
            });
            setAuth(true);
            setUser({name:name,email:email,
                income:0,
                expense:0,uid:userCredential.user.uid,categories:[{id:8,name:"All",total:0},{id:9,name:"Income",total:0},{id:1,name:"Food",total:0},{id:2,name:"Travel",total:0},{id:3,name:"Fashion",total:0},{id:4,name:"Entertainment",total:0},{id:5,name:"Rent",total:0},{id:6,name:"Health",total:0},{id:7,name:"Other",total:0}]})
            await AsyncStorage.setItem("user",JSON.stringify({name:name,
                income:0,
                expense:0,email:email,uid:userCredential.user.uid,categories:[{id:8,name:"All",total:0},{id:9,name:"Income",total:0},{id:1,name:"Food",total:0},{id:2,name:"Travel",total:0},{id:3,name:"Fashion",total:0},{id:4,name:"Entertainment",total:0},{id:5,name:"Rent",total:0},{id:6,name:"Health",total:0},{id:7,name:"Other",total:0},],}));
            ToastAndroid.show("Success",ToastAndroid.SHORT);
        })
        setLoad(false)
    }
    const logout=async()=>{
        setLoad(true)
        await getAuth(app).signOut();
        await AsyncStorage.removeItem("user");
        setAuth(false);
        setLoad(false)
        
        
    }


    const addTransaction=async(name,amount,category,mode,type)=>{
       
        let n={
            name:name,
            category:category,
            price:amount,
            mode:mode,
            type:type,
            Date:new Date().toISOString()
        };
        let u=user;
        if(!user.transactions){
            
            u.transactions=[n];
            
        }else{
            
            
            u.transactions.push(n);
           
        }
        u.categories.forEach(element => {
            if(element.name==category){
                element.total=Number(element.total)+Number(amount);

            }
            if(element.name=="All"){
                if(type=="Income"){
                    element.total=Number(element.total)+Number(amount);
                    u.income=Number(u.income)+Number(amount);
                }else{
                    element.total=Number(element.total)-Number(amount);
                    u.expense=Number(u.expense)+Number(amount);
                }
            }
            
           });
           
           await update(ref(db,'users/'+user.uid),u).then(()=>{
            ToastAndroid.show("Added",ToastAndroid.SHORT);
            })
            setUser(u);
            await AsyncStorage.setItem("user",JSON.stringify(u));
            setLoad(false);
        

    }

    const deleteTransaction=async(transaction)=>{
        let u=user;
        console.log(u.transactions)
        u.transactions=u.transactions.filter((i)=>i!=transaction);
        u.categories.forEach(element => {
            if(element.name==transaction.category){
                element.total=Number(element.total)-Number(transaction.price);

            }
            if(element.name=="All"){
                if(transaction.type=="Income"){
                    element.total=Number(element.total)-Number(transaction.price);
                    u.income=Number(u.income)-Number(transaction.price);
                }else{
                    element.total=Number(element.total)+Number(transaction.price);
                    u.expense=Number(u.expense)-Number(transaction.price);
                }
            }
            
           });
        await update(ref(db,'users/'+user.uid),u).then(()=>{
            ToastAndroid.show("Deleted",ToastAndroid.SHORT);
            }).catch((err)=>{
                console.log(err.message);
            })
            setUser(u);
            await AsyncStorage.setItem("user",JSON.stringify(u));
            setLoad(false);
    }
    const resetPassword=async(email)=>{
        setLoad(true)
        await sendPasswordResetEmail(auth,email).then(()=>{
            ToastAndroid.show("Check your mail to reset password",ToastAndroid.SHORT);
        }).catch((err)=>{
            ToastAndroid.show(err.message,ToastAndroid.SHORT);
        })
        setLoad(false)
    }
    
  return (
    <AuthContext.Provider value={{signup,Auth,login,resetPassword,user,addTransaction,load,setLoad,deleteTransaction,col,setCol,bac,setBac,logout}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContext