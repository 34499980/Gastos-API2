import { Item } from '../models/ItemModel';
import * as service from  '../services/TypeService';
import {StatusCodes} from 'http-status-codes';
import * as helper from '../helpers/Time';
const res = require('express/lib/response');

export async function add(req, res,){
    const entity = await service.getAll()   
    
    if(!entity.find(x => x.description == req.body.description)) {
        const newEntity: Item = {           
            description: req.body.description,            
            key: ''
            
        }
        const  key = await service.add(newEntity); 
       
        newEntity.key = key;
      
        service.edit(newEntity)
        res.status(StatusCodes.CREATED). send({
         menssage: 'Se genero el tipo ' + req.body.description
     });
    } else {
        res.status(500). send({
            menssage: 'El tipo ' + req.body.description + ' ya existe'
        });
    }
    
}  
  
export async function edit(req, res){
    const dbEntity = await service.getById(req)   
   
    if(dbEntity == undefined || dbEntity.key == req.body.key) { 
       const entity: Item = {
        key: req.body.key,       
        description: req.body.description       
        } 
      
        await service.edit(entity);
            res.status(StatusCodes.CREATED).send({
                menssage: 'Se actualizo el tipo ' + req.body.description
         });
    } else {
        res.status(StatusCodes.NOT_ACCEPTABLE). send({
            menssage: 'El tipo ' + req.body.description + ' ya existe'
        });
    }
   
 }
 export async function remove(req, res){
    const dbEntity = await service.getById(req)   
        if(dbEntity){
            service.remove(req);
        }
        res.status(200).send({
            menssage: 'Se elimino el tipo: '+ dbEntity.description
        });
    }
export async function getAll(req, res){
    let list = await service.getAll()
    res.status(StatusCodes.ACCEPTED).json(list);
 }
 
export async function getById(req, res){
    let entity = await service.getById(req)
    res.status(StatusCodes.ACCEPTED).json(entity);
 }

 
// Exportamos las funciones en un objeto json para poder usarlas en otros fuera de este fichero
module.exports = {
    add,
    edit,
    remove,
    getAll,
    getById
};
