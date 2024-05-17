import { Item } from "../models/itemmodel";


const table = 'Image';
const admin = require('firebase-admin');
 const db = admin.firestore()
// const db = admin.firestore();

export async function add(req): Promise<string>{
  
    
  
    return db.collection(table)
    
    .add({
          key: '',
          description: req.description        
  }).then(response => {
    
      return response.id;
     })
    
    
}
export async function edit(req): Promise<void>{
 
    var ref = db.collection(table);   
    var upref = ref.doc(req.key);
            upref.update( {
                key: req.key,
                description: req.description
         
           })
     
}
module.exports = {
    add,
    edit
};
