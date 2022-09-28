export const getSingleLocation=(data : any)=>{
       
        return  {
            type : 'GET-LOC',
            payload : {...data , ...{latitudeDelta : 0.04, longitudeDelta : 0.05}}
        }
    }