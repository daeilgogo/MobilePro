import { View, Text,StyleSheet,TouchableOpacity,Image, TextInput,} from 'react-native'
import React , {useState,useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import { db } from '../firebaseConfig';
import { addDoc, collection,doc } from 'firebase/firestore';

export default function AddList() {
    const navigation= useNavigation(); 
    const [activity,setActivity]=useState("")
    const [description,setDescription]=useState("");
    const [currentDate, setCurrentDate] = useState('');
    const [registerDate,setRegisterDate]=useState('')
    /// firebase connection
   const addDb= async()=>{
    try{
        await addDoc(collection(db,"plan"),{
            Activity:activity,
            Description:description,
            Date:registerDate,
        })

        setActivity("");
        setDescription("")
        alert("Plan has been Added")
        navigation.navigate('Make Your Day')

    }catch(error){
        console.log(error)
        alert("Could'nt add your plan")
    }
   }
 
  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      date + '/' + month + '/' + year 
    );


    setRegisterDate(
        date + '/' + month + '/' + year 
      + ' ' + hours + ':' + min + ':' + sec
      );
    
  }, []);
 
 


const addYourPlan=()=>{
if(activity===""|| description===""){
    alert("Please write your Activity and Description")
}else{
    addDb();
}
}
 
  return (

    <View style={styles.container}>
        <View style={styles.header}>
            <Image style={{width:100,height:100}} source={require('../assets/Icons/day.png')}/>
            <View style={{marginRight:50}}>
             <Text style={{fontSize:30, fontWeight:'bold' }}>Make your Plan</Text>
            </View>
        </View>
        <View style={{backgroundColor:'#E6F7F6', marginTop:20,width:400,height:500, borderRadius:5,alignItems:'center'}}>
            <View>
                <View style={{marginTop:10,backgroundColor:'white',width:380,height:40}}> 
                     <TextInput style={{width:380,height:40}} placeholder='Activity'  onChangeText={(activity)=>setActivity(activity)}/> 
                </View>
                <View style={{marginTop:10,backgroundColor:'white',width:380,height:200, borderRadius:10}}>
                     <TextInput style={{width:380,height:200}} placeholder='Description' multiline={true}
                 autoCorrect={true}
                 autoCapitalize={true}
                 onChangeText={(description)=>setDescription(description)}/>
                </View>
                <View style={{marginTop:10}}>
                     <Text>Today is : {currentDate}</Text>
                </View>

            </View>

          
           

              
            
         </View>
        
        <View>
            <TouchableOpacity style={styles.button}
                  onPress={()=>{addYourPlan(); }}>
                 <Text style={{fontSize:20,fontWeight:'bold'}}>Add Your Plan</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
  
    },
    header:{
        marginTop:30,
        backgroundColor:'#7DECF3',
        height:100,
        width:400,
        borderRadius:10,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between'

    },
    button:{
        marginTop:30, 
        backgroundColor:'#7DECF3', 
        padding:20,
        borderRadius:50}
  });