import { Item } from "../models/ItemModel";


const table = 'DataSource';
const admin = require('firebase-admin');
 const db = admin.firestore()
// const db = admin.firestore();

export async function getCategories(): Promise<Item[]>{
    let list: Item[] = [];
     return  await db.collection('Category').get().then(snap => {
        snap.forEach(doc => {           
            const item: Item = {
                key: doc.data().key,
                description: doc.data().name,
                image: doc.data().image 
            }
            list.push(item)
        });
        return list;
    });  
    
}
export async function getImages(): Promise<Item[]>{
    let list: Item[] = [];
     return  await db.collection('Image').get().then(snap => {
        snap.forEach(doc => {           
            const item: Item = {
                key: doc.data().key,
                description: doc.data().description
            }
            list.push(item)
        });
        return list;
    });  
    
}
export async function getTypes(): Promise<Item[]>{
    let list: Item[] = [];
     return  await db.collection('Type').get().then(snap => {
        snap.forEach(doc => {           
            const item: Item = {
                key: doc.data().key,
                description: doc.data().description
            }
            list.push(item)
        });
        return list;
    });  
    
}
 
module.exports = {
    getCategories,
    getImages,
    getTypes
};
