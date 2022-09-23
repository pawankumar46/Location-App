const initialLocation : any = []

 const locationReducer =(state = initialLocation , action : any )=>{
      switch(action.type){
          case 'ADD_GEO' : {
             return  [{...action.payload} , ...state]
          }
          case 'DELETE' : {
              return state.filter((ele : any , index : any)=>{
                      index !== action.payload
              })
          }
        default : {
            return state
        }
      }
 }

 export default locationReducer