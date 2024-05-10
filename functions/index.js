//import libraries
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as Category from "../models/CategoryModel"

//initialize firebase inorder to access its services
admin.initializeApp(functions.config().firebase);

//initialize express server
const app = express();
const main = express();

//add the path to receive request and set json as bodyParser to process the body 
main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

//initialize the database and the collection 
const db = admin.firestore();
const Collection = 'GastosDiarios';

/*app.post('/Category', async (req, res) => {
    try {
         const category = {
            id = 0,
            name: req.body['name'],
            image: req.body['image']           
         }
        }

        const newDoc = await db.collection(Collection).add(category);
        res.status(201).send(`Created a new category: ${newDoc.id}`);
    } catch (error) {
        res.status(400).send(`User should cointain firstName, lastName, email, areaNumber, department, id and contactNumber!!!`)
    });*/

//define google cloud function name
export const webApi = functions.https.onRequest(main);

