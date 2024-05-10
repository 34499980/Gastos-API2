import { Due } from "../models/DuesModel";
import { Item } from "../models/ItemModel";


const table = 'Type';

 const admin = require('firebase-admin');
 
 const db = admin.firestore()

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
                                    description: req.description,
                                    
                         })
     
    }
export async function remove(req){
     await db.collection(table).doc(req.key).delete();
    }
export async function getAll(): Promise<Item[]>{
    let list: Item[] = [];
     return  await db.collection(table).get().then(snap => {
        snap.forEach(doc => {          
           
            list.push(doc.data())
        });
        return list;
    });  
   
    
}
export async function getById(req): Promise<Item>{
   
     return await db.collection(table).doc(req.body.key).get().then(snap => {
        return snap.data()
    });     
 
 }   
  
  

// Exportamos las funciones en un objeto json para poder usarlas en otros fuera de este fichero
module.exports = {
    add,
    edit,
    remove,
    getAll,
    getById
};
