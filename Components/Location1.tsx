import { View, Text, FlatList ,Button , StyleSheet , Image} from 'react-native'
import * as Location from 'expo-location'
import React ,{useState , useEffect} from 'react'
import axios from 'axios';
import { useDispatch , useSelector } from 'react-redux';
import { addlocation, deleteAll, deleteSingle } from '../Actions/locationActions';
import { getSingleLocation } from '../Actions/singleLocation';
import { useInterval } from '../hooks/useInterval';
import { Ionicons } from '@expo/vector-icons'

const Location1 = () => {
     let dateTime  = new Date().toLocaleString()
      const [time , setTime] = useState(dateTime)
      const [current , setCurrent] = useState([])
      const [map , setMap] = useState({})
      const [toggle , setToggle] = useState(false)
      
     const dispatch = useDispatch()

      
      
      const location = useSelector((state : any)=>{
         return  state.location
      })
          
          
      useEffect(()=>{
         
         (async () => {
      
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              alert('Permission to access location was denied');
              return;
            }
      
            let location1 = await Location.getCurrentPositionAsync({});
             
             setMap(location1)
            
              let loc = {lat : location1.coords.latitude , log : location1.coords.longitude }
              dispatch(getSingleLocation(loc))
              axios.get(`https://us1.locationiq.com/v1/reverse.php?key=pk.70f00946344a6d835d510d9a3550e2e9&lat=${loc.lat}&lon=${loc.log}&format=json`)
               .then((res)=>{
                  const result  = res.data
                  
                     let loc : any = {address : result.address.neighbourhood , suburb : result.address.suburb , area : result.address.city_district}
                     
                     setCurrent(loc)
                  
               })
               .catch((err)=>{
                  alert(err.message)
               })
          })();
           
      },[])
    
      const  updatePosition=()=> {
         (async () => {
      
         let { status } = await Location.requestForegroundPermissionsAsync();
         if (status !== 'granted') {
           alert('Permission to access location was denied');
           return;
         }
         let location1 = await Location.getCurrentPositionAsync({});
         let myLatLng  = {lat: location1.coords.latitude, lng: location1.coords.longitude};
         axios.get(`https://us1.locationiq.com/v1/reverse.php?key=pk.70f00946344a6d835d510d9a3550e2e9&lat=${myLatLng.lat}&lon=${myLatLng.lng}&format=json`)
         .then((res)=>{
         const value = res.data
            
            dispatch(addlocation(value))
            setToggle(true)
         
         })
         .catch((err)=> alert(err.message))
      })()
                 
         };
        
       
      // useEffect(()=>{
      //    updatePosition()
      // },[])
         useInterval(updatePosition , 300000)
         
         //   setInterval(()=>{
         //     updatePosition()
         //   },3000000)
           
      
                        

          
          
         const handleDelete=(id : any)=>{
             dispatch(deleteSingle(id))
             console.log(id)
         }
        const handleDeleteAll=()=>{
             dispatch(deleteAll())
             setToggle(false)
        }
   
  return (
       <View style={Styles.main}>
      
        <View>
                       
      <Text style={Styles.text1}>Current location</Text>
            <View >
            {current  && (
            <View> 
               <View style={{flexDirection : 'row', justifyContent : 'space-between' , marginTop :  15}}>
               <Ionicons name="person-circle-outline" size={40} color="black" />
               <Text style={Styles.text3}> 
               {Object.values(current).join(', ')}</Text>
               </View>
              
            </View>
            )}
            </View>

                { toggle && (
                     <View>
                     <Text style={Styles.text2}>Previous location</Text>
               <FlatList  
               data={location} 
               keyExtractor={(item, i : any) =>  i}
               initialNumToRender={10}
               renderItem={({item , index})=>(

                    <View>
       
                        <View style={Styles.text4} >
                        <Text style={{width : '70%'}} >{`${item.address.neighbourhood}, ${item.address.suburb}, ${item.address.city_district}`} 
                        </Text>
                        <View style={Styles.btn1}>
                        <Button onPress={()=>handleDelete(index)}  title='Delete'/>
                        </View>
                        </View>
                        
                         <View style={Styles.time}>
                         <Text >{time}</Text>
                           </View>
                        
                    </View>
               )}
                />
                </View>
                )}              
               </View>
                  <View style={Styles.btn} >
                  <Button  title='Clear All' onPress={handleDeleteAll}/>
                  </View>
    
               </View>                               
  )
}

const Styles = StyleSheet.create({
  
   btn : {
      width : 300,
      paddingBottom : 30,
    marginLeft : 60, 
   position : 'absolute',
   bottom : 10,
 

   },
   main : {
      flex : 1
   },
   text1 : {
      marginTop : 10,
      fontSize : 18,
      marginLeft : 15
   },
   text2 : {
      margin : 5,
      marginLeft : 15,
      marginTop : 50,
      fontSize : 18,
   },
   text3 : {
 
    marginTop : 10,
    marginRight : 140,
    justifyContent : 'space-between',
   } ,
   text4 : {
      flexDirection : 'row',
    marginTop : 6,
    marginLeft : 15,
    justifyContent : 'space-between',
   },
   time : {
      paddingTop : 0,
      fontSize : 13,
      marginLeft : 15,
    
   },
   pic : {
      width : 40,
      height :40
   },
   btn1 : {
      marginRight : 12,
      borderRadius : 10,
     
   }
   
})

export default Location1