import { Due } from '../models/DuesModel';
import * as service from  '../services/DueService';
import * as movementService from  '../services/MovementService';
import {StatusCodes} from 'http-status-codes';
import { Movement } from '../models/MovementModel';
import * as helper from '../helpers/Time';
const res = require('express/lib/response');

export async function processByMonth(req, res){
   const list = await service.getAll();
   const listToUpdate = list.filter(x => x.actualCount != x.countDues);
   const listToRemove = list.filter(x => x.actualCount == x.countDues);
   for(const element of listToRemove){
       await service.remove(element)
   }
   for(const element of listToUpdate){
    element.actualCount++;
    const id = {key: element.movementKey};
    const movement = await movementService.getById(id);
    const newMovement: Movement = {
        key: '',
        description: movement.description,
        amount: movement.amount,
        typeKey: movement.typeKey,
        categoryKey: movement.categoryKey,
        year: new Date().getFullYear(),
        month: new Date().getMonth()+1,
        dueKey: movement.dueKey,
        createdDate: helper.getNowWithHours(),
        modifiedDate: '',
        createdBy: 'System',
        dueBool: true 
    }
    newMovement.key = await movementService.add(newMovement);
    await movementService.edit(newMovement);

    await service.edit(element);
   }
   
   res.status(StatusCodes.ACCEPTED).json({status: true});
}
export async function getAll(req, res){
    let list = await service.getAll()
    res.status(StatusCodes.ACCEPTED).json(list);
 }
 export async function getAllWithMovement(req, res){
    let list = await service.getAllWithMovement()
    for(const element of list){
        if(element.dueKey != ''){
            element.due = await service.getByMovementId(element.dueKey);
            console.log(element.due);
        }       
    }
    res.status(StatusCodes.ACCEPTED).json(list.filter(x => x.due != undefined));
 }
module.exports = {
    processByMonth,
    getAll,
    getAllWithMovement
};


