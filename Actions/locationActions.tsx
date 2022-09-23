 export const addlocation =(data : any)=>{
     return {
        type : 'ADD_GEO',
        payload : data
     }
 }

 export const deleteSingle=(id : any)=>{
     return {
        type : 'DELETE',
        payload : id
     }
 }
 