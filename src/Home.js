import { View, Text,StyleSheet, TouchableOpacity,Image, ScrollView } from 'react-native'
import React ,{useState}from 'react'
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebaseConfig';
import { collection, deleteDoc, doc, getDocs,  } from 'firebase/firestore';
//import { id } from 'date-fns/locale';



export default function Home(props) {
 const navigation= useNavigation();
 const [activity,setActivity]=useState([]);
 
  ///read from firebase

         getDocs(collection(db,'plan')).then(data => {
            setActivity(data.docs.map(doc=>({...doc.data(),id:doc.id})))
          })
      
   
 ///Delete from Data base
 
const deleteFromDB=async(docId)=>{
    try{
        const docRef= doc(db,"plan",docId)
        await deleteDoc(docRef).then(()=>{
          
        alert("Plan has been deleted")
        getDocs(collection(db,'plan')).then(data => {
          setActivity(data.docs.map(doc=>({...doc.data(),id:doc.id})))
        })
 

        })

    }catch(error){
        alert("Plan has not  been deleted");
        console.log(error.message)
    }
}

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Image style={{width:100,height:100}} source={require('../assets/Icons/day.png')}/>
            <View style={{marginRight:50}}>
                 <Text style={{fontSize:30, fontWeight:'bold' }}>Make your Day</Text>
            </View>
             
        </View>
        <TouchableOpacity 
        style={{marginTop:20,marginRight:20,flexDirection:'row',justifyContent:'space-between',backgroundColor:'#CDBFF0',height:50,alignItems:'center',borderRadius:10}}>
             <Text style={{fontSize:20,fontWeight:'bold'}}> Your Tasks for Today</Text>
             <Image style={{width:40,height:40,marginLeft:100,marginTop:-2}}source={require('../assets/Icons/task.png')}/>
        </TouchableOpacity>
        <ScrollView style={{backgroundColor:'#E6F7F6',marginTop:10,width:390,borderRadius:15}}>
        {
                activity?.map((row,idx)=>{
                    return(
                 <View  key={idx}  style={{backgroundColor:'white',marginTop:10,borderRadius:15,flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{width:250,backgroundColor:'white'}}>
                         <View styles={{margninTop:50}}>
                              <Text style={{color:'red'}}>Plan {idx}</Text>
                              <Text style={{color:'white'}}>Id {row.id}</Text>
                              <Text style={{color:'blue'}}>{row.Activity}</Text>
                         </View>
                          <View styles={{margninTop:20}}>
                              <Text>{row.Description}</Text>
                         </View >
                          
                         <View styles={{margninTop:20,backgroundColor:'blue',padding:100}}>
                              <Text>Date: {row.Date}</Text> 
                         </View>
 
                    </View>
                     <TouchableOpacity style={{marginTop:12,marginLeft:0}} onPress={()=>navigation.navigate("Edite",{row,idx})}>
                          <Image style={{width:40,height:40}}source={require('../assets/Icons/edite.png')}/>
                     </TouchableOpacity>
                     <TouchableOpacity style={{marginTop:12,marginRight:20}}
                     onPress={()=>deleteFromDB(row.id)}>
                          <Image style={{width:40,height:40}}source={require('../assets/Icons/delete.png')}/>
                     </TouchableOpacity>
                 </View>
          )
        })
    }
      </ScrollView>
        <View style={{backgroundColor:'white'}}>
            <TouchableOpacity style={{marginTop:50,marginBottom:20}} onPress={()=>{navigation.navigate('Add')}}>
                <Image source={require("../assets/Icons/add.png")} style={{width:50,height:50}} />
            </TouchableOpacity>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
  
    },
    header:{
        marginTop:30,
        backgroundColor:'#7DECF3',
        height:100,
        width:400,
        borderRadius:50,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between'

    }
  });