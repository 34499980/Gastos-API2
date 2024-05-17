
import { Total } from "../models/totalmodal";

const table = 'Total';
 //const admin = require('firebase-admin')
 const admin = require('firebase-admin');
 const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, collection } = require('firebase-admin/firestore');


 /*var serviceAccount = require("../gastosdiarios-e2f45-firebase-adminsdk-jesw0-d61e0f952c.json");
 admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://gastosdiarios-e2f45-default-rtdb.firebaseio.com"
  });
  const firebaseConfig = {
    apiKey: "AIzaSyAJBXrm_vFWN-zpjuY6EHCQVPfYWtWE740",
    authDomain: "gastosdiarios-e2f45.firebaseapp.com",
    projectId: "gastosdiarios-e2f45",
    storageBucket: "gastosdiarios-e2f45.appspot.com",
    messagingSenderId: "436280068960",
    appId: "1:436280068960:web:ad9f396c062286f4a8ac05",
    measurementId: "G-XL8PN6CYMJ"
  };*/

 //const db = admin.database();
 const db = admin.firestore()
// const db = admin.firestore();
export async function add(req): Promise<string>{
  
    
  
  return db.collection(table)
  
  .add({
    key: '',
    year: req.year,
    month: req.month,
    input: req.input,
    buy: req.buy,    
    balance: req.balance
}).then(response => {
  
    return response.id;
   })
  

   
  

 
}  
  
export async function edit(req): Promise<void>{
 
    var ref = db.collection(table);   
    var upref = ref.doc(req.key);
            upref.update( {
                            key: req.key,
                            year: req.year,
                            month: req.month,
                            input: req.input,
                            buy: req.buy,    
                            balance: req.balance
                         })
     
    }
export async function remove(req){
     await db.collection(table).doc(req.body.key).delete();
    }
export async function getAll(): Promise<Total[]>{
    let list: Total[] = [];
     return  await db.collection(table).get().then(snap => {
        snap.forEach(doc => {         
           
            list.push(doc.data())
        });
        return list;
    });  
}
export async function getById(req): Promise<Total>{
    
     return await db.collection(table).doc(req.body.key).get().then(snap => {
        return snap.data()
    });     
 }   
 export async function getMonth(req): Promise<Total>{
    
    return await db.collection(table).doc(req.body.key).get().then(snap => {
       return snap.data()
   });     
}   
export async function getByMonth(req): Promise<Total>{
    let entity: Total;
    const month = Number(req.month);
    const year = Number(req.year);
    return await db.collection(table).where("month", "==", month)                                     
                                     .where("year", "==", year)
                                     .get().then(snap => {
        snap.forEach(doc => {            
           
            entity = doc.data()
        });
       
        return entity;
    });     
} 
module.exports = {
    add,
    edit,
    remove,
    getAll,
    getById,
    getByMonth
};
