import { Due } from "../models/DuesModel";
import { Movement } from "../models/MovementModel";


const table = 'Due';

 const admin = require('firebase-admin');
 
 const db = admin.firestore()

export async function add(req): Promise<string>{
  
    
  
  return db.collection(table)
  
  .add({
        key: '',
        amount: req.amount,
        actualCount: req.actualCount,
        countDues: req.countDues,
        movementKey: req.movementKey,
        totalAmount: req.totalAmount
}).then(response => {
  
    return response.id;
   })
  

   
  

 
}  
  
export async function edit(req): Promise<void>{
 
    var ref = db.collection(table);   
    var upref = ref.doc(req.key);
            upref.update( {
                        key: req.key,
                        amount: req.amount,
                        actualCount: req.actualCount,
                        countDues: req.countDues,
                        movementKey: req.movementKey,
                        totalAmount: req.totalAmount
                         })
     
    }
export async function remove(req){
     await db.collection(table).doc(req.key).delete();
    }
export async function getAll(): Promise<Due[]>{
    let list: Due[] = [];
     return  await db.collection(table).get().then(snap => {
        snap.forEach(doc => {          
           
            list.push(doc.data())
        });
        return list;
    });  
    
}
export async function getAllWithMovement(): Promise<Movement[]>{
    let list: Movement[] = [];
     return  await db.collection('Movement').where("dueKey", "!=", '') .get().then(snap => {
        snap.forEach(doc => {          
           
            list.push(doc.data())
        });
        return list;
    });  
    
}
export async function getByMovementId(key: string): Promise<Due>{
     return await db.collection(table).doc(key).get().then(snap => {
        return snap.data()
    });     
   
 }   

module.exports = {
    add,
    edit,
    remove,
    getAll,
    getByMovementId,
    getAllWithMovement
};
