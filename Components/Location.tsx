import { View, Text, FlatList ,Button , StyleSheet , Image} from 'react-native'

import React ,{useState , useEffect} from 'react'
import axios from 'axios';
import { useDispatch , useSelector } from 'react-redux';
import { addlocation, deleteAll, deleteSingle } from '../Actions/locationActions';


const Location = () => {
     let dateTime  = new Date().toLocaleString()
      const [time , setTime] = useState(dateTime)
      const [current , setCurrent] = useState([])
      const [toggle , setToggle] = useState(false)

     const dispatch = useDispatch()

      
      
      const location = useSelector((state : any)=>{
         return  state.location
      })
    
      useEffect(()=>{
             navigator.geolocation.getCurrentPosition((position)=>{
                let loc = {lat: position.coords.latitude, lng: position.coords.longitude}
                axios.get(`https://us1.locationiq.com/v1/reverse.php?key=pk.70f00946344a6d835d510d9a3550e2e9&lat=${loc.lat}&lon=${loc.lng}&format=json`)
                .then((res)=>{
                  const result = res.data
                     let loc : any = {address : result.address.neighbourhood , suburb : result.address.suburb , area : result.address.city_district}
                      console.log(loc)
                     setCurrent(loc)
                })
                .catch((err)=>{
                   alert(err.message)
                })
             })
      },[])
          
      console.log( 'current loc',current)




  
    function updatePosition() {
      navigator.geolocation.getCurrentPosition((position)=> {
          let myLatLng = {lat: position.coords.latitude, lng: position.coords.longitude};
             axios.get(`https://us1.locationiq.com/v1/reverse.php?key=pk.70f00946344a6d835d510d9a3550e2e9&lat=${myLatLng.lat}&lon=${myLatLng.lng}&format=json`)
             .then((res)=>{
              const value = res.data
                
                dispatch(addlocation(value))
                 setToggle(true)
               console.log(value)
             })
             .catch((err)=> alert(err.message))
        });
      }
          setTimeout(updatePosition, 300000);

          
          
         const handleDelete=(id : any)=>{
             dispatch(deleteSingle(id))
             console.log(id)
         }
        const handleDeleteAll=()=>{
             dispatch(deleteAll())
             setToggle(false)
        }
   
  return (
    
      
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
               keyExtractor={(item, i) =>  i}
               initialNumToRender={30}
               renderItem={({item , index})=>(
                    <View  >
       
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
                                    <View style={Styles.btn} >
                                    <Button   title='Clear All' onPress={handleDeleteAll}/>
                                    </View>
         
                                    </View>
  )
}

const Styles = StyleSheet.create({
  
   btn : {
     
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 30
   },
   text1 : {
      margin : 10,
      textDecorationLine: 'underline',
      fontSize : 18
   },
   text2 : {
      margin : 5,
      marginTop : 10,
      fontSize : 18,
      textDecorationLine: 'underline'
   },
   text3 : {
      flexDirection: 'row',
    margin : 5
   } ,
   time : {
      fontSize : 12
   },
   pic : {
      width : 30,
      height :30
   }
   
})

export default Location