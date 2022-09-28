const initialSingleLocation : any = {}

const singleLocation =(state = initialSingleLocation , action : any)=>{
      switch(action.type){
        case'GET-LOC' : {
             return {...action.payload}
        }

        default : {
            return state
        }
      }
}

export default singleLocation