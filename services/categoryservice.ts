import { Category } from "../models/categorymodel";

const table = 'Category';
 //const admin = require('firebase-admin')
 const admin = require('firebase-admin');
 const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, collection } = require('firebase-admin/firestore');


 var serviceAccount = require("../gastosdiarios-e2f45-firebase-adminsdk-jesw0-d61e0f952c.json");
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
  };

 //const db = admin.database();
 const db = admin.firestore()
// const db = admin.firestore();
export async function add(req): Promise<string>{
  
    
  
  return db.collection(table)
  
  .add({
    key: '',
    name: req.name,
    image: req.image,
    createdDate: req.createdDate,
    modifiedDate: ''
}).then(response => {
  
    return response.id;
   })
  

   
  

 
}  
  
export async function edit(req): Promise<void>{
 
    var ref = db.collection(table);
   
    var upref = ref.doc(req.key);
            upref.update( {
                                    key: req.key,
                                    name: req.name,
                                    image: req.image,                                  
                                    modifiedDate: req.modifiedDate,
                                    createdDate: req.createdDate
                         })
     
    }
export async function remove(key){
     await db.collection(table).doc(key).delete();
    }
export async function getAll(): Promise<Category[]>{
    let list: Category[] = [];
     return  await db.collection(table).get().then(snap => {
        snap.forEach(doc => {           
           
            list.push(doc.data())
        });
        return list;
    });  
    
}
export async function getById(key): Promise<Category>{
    
     return await db.collection(table).doc(key).get().then(snap => {
        return snap.data()
    });     
 }   
  
export async function getByName(req): Promise<Category>{
    let entity: Category;
    return await db.collection(table).where("name", "==", req.body.name).get().then(snap => {
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
    getByName,
    getById
};
