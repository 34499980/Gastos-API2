import { User } from '../models/usermodel';
import * as service from  '../services/totalservice';
import * as movementService from  '../services/movementservice';
import * as dueService from  '../services/dueservice';
import {StatusCodes} from 'http-status-codes';
import * as helper from '../helpers/Time';
import { Type } from '../enums/type';
import { Total } from '../models/totalmodal';

const res = require('express/lib/response');

export async function processTotals(req, res){  
   
    let monthReduce = 1;
    
        const date = helper.subtractMonths(monthReduce);
      
        monthReduce++;
        
        const movementEntities = await movementService.getByMonth(date);
       
       
       
        const inputArray = movementEntities.filter(x => x.typeKey == Type.input)
                                   //    .map(q => q.amount);
                                       
        const buyArray = movementEntities.filter(x => x.typeKey == Type.buy)
                                      // .map(q => q.amount);
                                 
        const input = parseInt(inputArray.reduce((result, value) => result + value.amount, 0).toString());
        const buy = parseInt(buyArray.reduce((result, value) => result + value.amount, 0).toString());
        const total: Total = {
            input: input,
            buy: buy,
            balance: input - buy,
            year: date.year,
            month: date.month,
            key: '',
            createdDate: helper.getNowWithHours()        
        }
        let totalEntity = await service.getByMonth(date)
        if(totalEntity != null || totalEntity != undefined) {
            totalEntity.input = total.input;
            totalEntity.buy = total.buy;
            totalEntity.balance = totalEntity.input - totalEntity.buy;
          
            await service.edit(totalEntity);   
        } else {
            total.key = await service.add(total);
           
            await service.edit(total);   
        }
       
        
       // let movementToRemoveAll = (await movementService.getAllYears()).filter(({key}) => !dueEntities.includes(key)).filter(x => x.month < date.month);
      //  const movementToRemove =  movementEntities.filter(({key}) => !dueEntities.includes(key));
      //  movementToRemoveAll = [...movementToRemoveAll, ...movementToRemove]
     
        //console.log(movementToRemoveAll)
       
    
    
    
    
   res.status(StatusCodes.ACCEPTED).json({status: true});
}  
  
export async function removeByMonths(req, res){
    const dueEntities = (await dueService.getAll()).map(x => x.key); 
    const date = helper.subtractMonths(3);
   
    const movementEntities = await movementService.getByMonth(date);   
    
    for(const item of movementEntities){
       
        if(item.dueKey != null) {
            const due = dueEntities.find(x => x == item.dueKey);
         
            if(due == undefined) {
                await movementService.remove(item);
            }
        } else {
            await movementService.remove(item);
        }
        
    }
    res.send(StatusCodes.ACCEPTED)
 }
 export async function removeOldDues(req, res){
    const dueEntities = (await dueService.getAll()).map(x => x.key); 
    const date = helper.subtractMonths(3);
 
    const movementEntities = (await movementService.getMinorMonth(date)).filter(x => x.month < date.month);   
   
    for(const item of movementEntities){
       
        if(item.dueKey != null && item.dueKey != '') {
            const due = dueEntities.find(x => x == item.dueKey);
            if(due == undefined) {
                await movementService.remove(item.key);
            }
        } else {
            await movementService.remove(item.key);
        }
        
    }
    res.status(StatusCodes.ACCEPTED).json({status: true});
}
export async function getAll(req, res){
    let list = await service.getAll()  
    res.status(StatusCodes.ACCEPTED).json(list);
 }
export async function getById(req, res){
    let entity = await service.getById(req)
    res.status(StatusCodes.ACCEPTED).json(entity);
 }
 export async function getByMonth(req, res){
    const date = new Date();
    let result: Boolean = false;
    let entity = await service.getByMonth({month: date.getMonth(), year: date.getFullYear()})   
    if(entity) result = true;
    res.status(StatusCodes.ACCEPTED).json(result);
 }
 
// Exportamos las funciones en un objeto json para poder usarlas en otros fuera de este fichero
module.exports = {
    processTotals,
    removeByMonths,
    removeOldDues,
    getAll,
    getById,
    getByMonth
};
