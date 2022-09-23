const initialLocation : any = []

 const locationReducer =(state = initialLocation , action : any )=>{
      switch(action.type){
          case 'ADD_GEO' : {
             return  [{...action.payload} , ...state]
          }
          case 'DELETE' : {
              return state.filter((ele : any , index : any)=>{

                return   index !== action.payload
              })
          }
          case 'DELETE_APP' : {
             return  initialLocation
             
          }
        default : {
            return state
        }
      }
 }

 export default locationReducer