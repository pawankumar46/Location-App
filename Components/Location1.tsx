import { View, Text, FlatList ,Button , StyleSheet , Image} from 'react-native'
import * as Location from 'expo-location'
import React ,{useState , useEffect} from 'react'
import axios from 'axios';
import { useDispatch , useSelector } from 'react-redux';
import { addlocation, deleteAll, deleteSingle } from '../Actions/locationActions';
import { getSingleLocation } from '../Actions/singleLocation';

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
           setTimeout(updatePosition , 300000)
          
           

          
          
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
            <View>
            {current  && (
            <View> 
               
               <Text style={Styles.text3}> <Image style={Styles.pic}  source={require('../image/pic.png')} /> 
               {Object.values(current).join(', ')}</Text>
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
       
                        <View style={Styles.text3} >
                        <Text>{`${item.address.neighbourhood}, ${item.address.suburb}, ${item.address.city_district}`} 
                        </Text>
                        <Button onPress={()=>handleDelete(index)}  title='delete'/>
                        </View>
                        <Text style={Styles.time}>{time}</Text>
                    </View>
               )}
                />
                </View>
                )}              
               </View>
                  <View style={Styles.btn} >
                  <Button   title='Clear All' onPress={handleDeleteAll}/>
                  </View>
    
               </View>                               
  )
}

const Styles = StyleSheet.create({
  
   btn : {
      paddingBottom : 30,
    marginLeft : 150, 
   position : 'absolute',
   bottom : 0
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
      marginTop : 20,
      fontSize : 18,
   },
   text3 : {
   flexDirection : 'row',
    marginTop : 5
   } ,
   time : {
      fontSize : 12
   },
   pic : {
      width : 40,
      height :40
   }
   
})

export default Location1