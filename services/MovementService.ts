import { Movement } from "../models/MovementModel";


const table = 'Movement';

 const admin = require('firebase-admin');
 
 const db = admin.firestore()

export async function add(req): Promise<string>{
  
    
  
  return db.collection(table)
  
  .add({
    key: '',
    description: req.description,
    amount: req.amount,
    typeKey: req.typeKey,
    categoryKey: req.categoryKey,
    year: req.year,
    month: req.month,
    dueKey: req.dueKey,
    createdDate: req.createdDate,
    modifiedDate: '',
    createdBy: req.createdBy   
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
                amount: req.amount,
                typeKey: req.typeKey,
                categoryKey: req.categoryKey,
                year: req.year,
                month: req.month,
                dueKey: req.dueKey,
                createdDate: req.createdDate,
                modifiedDate: req.modifiedDate,
                createdBy: req.createdBy   
                         })
     
    }
export async function remove(req){
     await db.collection(table).doc(req.key).delete();
    }
export async function getAllYears(): Promise<Movement[]>{
    let list: Movement[] = [];
     return  await db.collection(table).get().then(snap => {
        snap.forEach(doc => {           
           
            list.push(doc.data())
        });
        return list;
    });  
    
}
export async function getById(req): Promise<Movement>{  
   
     return await db.collection(table).doc(req.key).get().then(snap => {
        return snap.data()
    });     
 }   
  
export async function getByMonth(req): Promise<Movement[]>{
    let list: Movement[] = [];
    const month = Number(req.month);
    const year = Number(req.year);
    return await db.collection(table).where("month", "==", month)                                     
                                     .where("year", "==", year)
                                     .get().then(snap => {
        snap.forEach(doc => {            
           
            list.push(doc.data())
        });      
        return list;
    });     
}
export async function getMinorMonth(req): Promise<Movement[]>{
    let list: Movement[] = [];    
    const month = Number(req.month);
    const year = Number(req.year);
    return await db.collection(table)                                     
                                     .where("year", "<=", year)
                                     .get().then(snap => {
        snap.forEach(doc => {            
           
            list.push(doc.data())
        });       
        return list;
    });     
}
module.exports = {
    add,
    edit,
    remove,
    getAllYears,
    getByMonth,
    getById,
    getMinorMonth
};
