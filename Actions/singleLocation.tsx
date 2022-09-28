export const getSingleLocation=(data : any)=>{
       console.log("single",{...data , ...{latitudeDelta : 0.04, longitudeDelta : 0.05}})
        return  {
            type : 'GET-LOC',
            payload : {...data , ...{latitudeDelta : 0.04, longitudeDelta : 0.05}}
        }
    }