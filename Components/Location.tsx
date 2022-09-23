import { View, Text, FlatList ,Button , StyleSheet} from 'react-native'

import React ,{useState , useEffect} from 'react'
import axios from 'axios';
import { useDispatch , useSelector } from 'react-redux';
import { addlocation, deleteSingle } from '../Actions/locationActions';
import Geolocation from '@react-native-community/geolocation';

const Location = () => {
     let dateTime  = new Date().toLocaleString()
      const [time , setTime] = useState(dateTime)
     const dispatch = useDispatch()

      
      
      const location = useSelector((state : any)=>{
         return  state.location
      })
    // useEffect(()=>{
          
    //    let res = setInterval(()=>{
    //     navigator.geolocation.getCurrentPosition((position)=>{
    //          setLatitude(position.coords.latitude)
    //     })
    //    }, 3000)
  
    //    return ()=>{
    //        clearInterval(res)
    //    }
    // },[ latitude ])
    // console.log(latitude)



// import Geolocation form '@react-native-community/geolocation';
// Geolocation.etCurrentPosition((position) => {
//     console.log(position)
// },
// (error) => alert(JSON.stringify(error))
  
    function updatePosition() {
      navigator.geolocation.getCurrentPosition((position)=> {
          let myLatLng = {lat: position.coords.latitude, lng: position.coords.longitude};
             axios.get(`https://us1.locationiq.com/v1/reverse.php?key=pk.70f00946344a6d835d510d9a3550e2e9&lat=${myLatLng.lat}&lon=${myLatLng.lng}&format=json`)
             .then((res)=>{
              const value = res.data
                dispatch(addlocation(value))
               console.log(value)
             })
             .catch((err)=> alert(err.message))
        
      });
  }
         //  setTimeout(updatePosition, 3000);
          
         const handleDelete=(id : any)=>{
             dispatch(deleteSingle(id))
             console.log(id)
         }
        const handleDeleteAll=()=>{
           // delete all posts 
        }
   
  return (
    
      
        <View>
        <FlatList  
        data={location} 
        keyExtractor={(item, index) => item.id}
        renderItem={({item , index})=>(
             <View  >

                                 <View >
                                 <Text>{item.display_name} <Button onPress={()=>handleDelete(index)}  title='delete'/> </Text>
                                 <Text>{time}</Text>
                                 </View>
             </View>
        )}
         />
        
                                    <View style={Styles.btn} >
                                    <Button   title='Clear All' onPress={handleDeleteAll}/>
                                    </View>
         
                                    </View>
  )
}

const Styles = StyleSheet.create({
  
   btn : {
      marginBottom : 100
   }
   
})

export default Location