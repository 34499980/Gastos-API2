import { User } from '../models/usermodel';
import * as service from  '../services/movementservice';
import * as duesService from  '../services/dueservice';
import {StatusCodes} from 'http-status-codes';
import { Movement } from '../models/movementmodel';
import { Due } from '../models/duesmodel';
import * as helper from '../helpers/Time';
const res = require('express/lib/response');

export async function add(req, res){
   
    let dueEntity: Due;
    const newEntity: Movement = {
        key: req.body.key,
        description: req.body.description,
        amount: req.body.amount,
        typeKey: req.body.typeKey,
        categoryKey: req.body.categoryKey,
        year: req.body.year,
        month: req.body.month,
        dueKey: req.body.dueKey,
        createdDate: helper.getNowWithHours(),
        modifiedDate: '',
        createdBy: req.body.createdBy,
        dueBool: req.body.dueBool 
    }
    if(newEntity.dueBool == true) {
         dueEntity = {
            key: '',
            amount: req.body.due.totalAmount / req.body.due.countDues,
            actualCount: 1,
            countDues: req.body.due.countDues,
            movementKey: '',
            totalAmount: req.body.due.totalAmount
            
        }
        newEntity.amount = dueEntity.amount; 
        dueEntity.key = await duesService.add(dueEntity);
        newEntity.dueKey = dueEntity.key
    }
    newEntity.key = await service.add(newEntity)
    await service.edit(newEntity);
    if(newEntity.dueBool == true) {
        dueEntity.movementKey = newEntity.key;
        await duesService.edit(dueEntity);
    }
    
    res.status(StatusCodes.CREATED). send({
        menssage: 'Se genero el movimiento'
    });
}    
export async function edit(req, res){
   
    const dbEntity = await getById(req, res)   
    
    if(dbEntity != undefined){
        const newEntity: Movement = {
            key: dbEntity.key,
            description: req.body.description,
            amount: req.body.amount,
            typeKey: req.body.typeKey,
            categoryKey: req.body.categoryKey,
            year: dbEntity.year,
            month: dbEntity.month,
            dueKey: dbEntity.dueKey,
            createdDate: dbEntity.createdDate,
            modifiedDate: helper.getNowWithHours(),
            createdBy: dbEntity.createdBy,
            dueBool: dbEntity.dueBool 
        }
        if(newEntity.dueBool == true) {
            let due = await duesService.getByMovementId(newEntity.key)
            due = {
                key: due.key,
                amount: req.body.due.totalAmount / req.body.due.countDues?? due.countDues,
                actualCount: due.key == undefined? 1 : due.actualCount,
                countDues: req.body.due.countDues?? due.countDues,
                movementKey: due.movementKey,
                totalAmount: req.body.due.totalAmount
            }    
            newEntity.amount = due.amount;       
            await duesService.edit(due);

        }
        service.edit(newEntity);
        res.status(StatusCodes.CREATED).send({
            menssage: 'Se actualizo el movimiento'
     });
    }
}
 export async function remove(req, res){
    let key = {};   
    if(req.body.month == undefined){
        key =  req.query.key;
    } else {
        key = req.body.key;
    }
   
    const dbEntity = await service.getById(key);
    if(dbEntity.dueBool){
       const due = await duesService.getByMovementId(dbEntity.key);
       await duesService.remove(due);
    }
    if(dbEntity != undefined) {
        service.remove(key)
        res.status(StatusCodes.ACCEPTED).send({
            menssage: 'Se elimino el movimiento'
        });
    }
   
}
export async function getAllYears(req, res){       
   const list = await service.getAllYears()
   res.status(StatusCodes.ACCEPTED).json(list);

}
export async function getByMonth(req, res){
    let date = {};   
    if(req.body.month == undefined){
         date = {month: req.query.month, year: req.query.year};
    } else {
         date = {month: req.body.month, year: req.body.year};
    }

    
    const list = await service.getByMonth(date) 
    const listResult = list.sort((a,b) => b.categoryKey.localeCompare(a.categoryKey));
    for(const element of listResult){
        if(element.dueKey != ''){
            element.due = await duesService.getByMovementId(element.dueKey);
          
        }       
    }
    
    res.status(StatusCodes.ACCEPTED).json(listResult);
   
}
export async function getById(req, res){
    let key = {};   
    if(req.body.month == undefined){
        key =  req.query.key;
    } else {
        key = req.body.key;
    }
   
   const entity = await service.getById(key);
   return entity;
}
 
module.exports = {
    add,
    edit,
    remove,
    getAllYears,
    getByMonth,
    getById
};
