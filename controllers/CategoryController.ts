import { Category } from '../models/CategoryModel';
import * as service from  '../services/CategoryService';
import {StatusCodes} from 'http-status-codes';
//var service = require('../services/CategoryService');
import * as helper from '../helpers/Time';
const res = require('express/lib/response');

export async function add(req, res,){
    const entity = await getByNamePrivate(req, res)
    if(entity == undefined) {
        const newEntity: Category ={
            key: '',
            name: req.body.name,
            image: req.body.image,
            createdDate: helper.getNowWithHours(),
            modifiedDate: '',
            createdBy: ''
        }
        const  key = await service.add(newEntity);  
        newEntity.key = key;
        
       // req.body.modifiedDate = helper.getNowWithHours();
    
        service.edit(newEntity)
        res.status(StatusCodes.CREATED). send({
         menssage: 'Se genero la categoria ' + req.body.name
     });
    } else {
        res.status(500). send({
            menssage: 'La categoria ' + req.body.name + ' ya existe'
        });
    }
    
}  
  
export async function edit(req, res){
    const dbEntity = await getByNamePrivate(req, res)   
   
    if(dbEntity == undefined || dbEntity.key == req.body.key) { 
       const entity: Category = {
        key: req.body.key,
        createdDate: req.body.createdDate,
        name: req.body.name,  
        image: req.body.image,          
        modifiedDate: helper.getNowWithHours(),
        createdBy: ''
        } 
      
        await service.edit(entity);
            res.status(StatusCodes.CREATED).send({
                menssage: 'Se actualizo la categoria ' + req.body.name
         });
    } else {
        res.status(StatusCodes.NOT_ACCEPTABLE). send({
            menssage: 'La categoria ' + req.body.name + ' ya existe'
        });
    }
   
 }
 export async function remove(req, res){
    const dbEntity = await getByIdPrivate(req, res)   
        if(dbEntity){
            service.remove(req);
        }
        res.status(200).send({
            menssage: 'Se elimino la categoria: '+ dbEntity.name
        });
    }
export async function getAll(req, res){
    let list = await service.getAll()
    res.status(StatusCodes.ACCEPTED).json(list);
 }
 export async function getByNamePrivate(req, res){
    let list =  await service.getByName(req)
    return list;
 }
 export async function getByName(req, res){
    let list =  await service.getByName(req)
    res.status(StatusCodes.ACCEPTED).json(list);
 }
export async function getById(req, res){
    let entity = await service.getById(req)
    res.status(StatusCodes.ACCEPTED).json(entity);
 }
 export async function getByIdPrivate(req, res){
    return await service.getById(req)
    
 }
 
// Exportamos las funciones en un objeto json para poder usarlas en otros fuera de este fichero
module.exports = {
    add,
    edit,
    remove,
    getAll,
    getByName,
    getById
};
