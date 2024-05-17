import { User } from '../models/usermodel';
import * as movementService from  '../services/movementservice';
import * as dueService from  '../services/dueservice';
import {StatusCodes} from 'http-status-codes';
import * as helper from '../helpers/Time';
import { Type } from '../enums/type';
import { Total } from '../models/totalmodal';
import { Movement } from '../models/movementmodel';
import { Due } from '../models/duesmodel';

const res = require('express/lib/response');

export async function AddMovement(req, res){
    let addList: Movement[] = [
        {
            "key": "",
            "description": "Sueldo",
            "amount": 100000,
            "typeKey": '1',
            "categoryKey": "MYf10RFsecN8p3LibuiL",
            "year": 2023,
            "month": 1,
            "dueKey": null,
            "createdDate": null,
            "modifiedDate": null,
            "createdBy": "oz7e2lIpbskD4KiPLGij",
            "dueBool": false 
        },
        {
            "key": "",
            "description": "Coto",
            "amount": 30000,
            "typeKey": '2',
            "categoryKey": "MYf10RFsecN8p3LibuiL",
            "year": 2023,
            "month": 1,
            "dueKey": null,
            "createdDate": null,
            "modifiedDate": null,
            "createdBy": "oz7e2lIpbskD4KiPLGij",
            "dueBool": false 
        },
        {
            "key": "",
            "description": "Sueldo",
            "amount": 100000,
            "typeKey": '1',
            "categoryKey": "MYf10RFsecN8p3LibuiL",
            "year": 2023,
            "month": 2,
            "dueKey": null,
            "createdDate": null,
            "modifiedDate": null,
            "createdBy": "oz7e2lIpbskD4KiPLGij",
            "dueBool": false 
        },
        {
            "key": "",
            "description": "Coto",
            "amount": 50000,
            "typeKey": '2',
            "categoryKey": "MYf10RFsecN8p3LibuiL",
            "year": 2023,
            "month": 2,
            "dueKey": null,
            "createdDate": null,
            "modifiedDate": null,
            "createdBy": "oz7e2lIpbskD4KiPLGij",
            "dueBool": false 
        },
        {
            "key": "",
            "description": "Heladera",
            "amount": 120000,
            "typeKey": '2',
            "categoryKey": "MYf10RFsecN8p3LibuiL",
            "year": 2023,
            "month": 2,
            "dueKey": null,
            "createdDate": null,
            "modifiedDate": null,
            "createdBy": "oz7e2lIpbskD4KiPLGij",
            "dueBool": true,
            "due" : {
                "key": "",
                "amount": 120000,
                "countDues": 6,
                "actualCount": 1,
                "movementKey": "",
                "totalAmount": 120000
            } 
        },
        {
            "key": "",
            "description": "sueldo",
            "amount": 200000,
            "typeKey": '1',
            "categoryKey": "MYf10RFsecN8p3LibuiL",
            "year": 2023,
            "month": 3,
            "dueKey": null,
            "createdDate": null,
            "modifiedDate": null,
            "createdBy": "oz7e2lIpbskD4KiPLGij",
            "dueBool": false 
        },
        {
            "key": "",
            "description": "coto",
            "amount": 50000,
            "typeKey": '1',
            "categoryKey": "MYf10RFsecN8p3LibuiL",
            "year": 2023,
            "month": 3,
            "dueKey": null,
            "createdDate": null,
            "modifiedDate": null,
            "createdBy": "oz7e2lIpbskD4KiPLGij",
            "dueBool": false 
        },
        {
            "key": "",
            "description": "Lavarropas",
            "amount": 90000,
            "typeKey": '2',
            "categoryKey": "MYf10RFsecN8p3LibuiL",
            "year": 2023,
            "month": 3,
            "dueKey": null,
            "createdDate": null,
            "modifiedDate": null,
            "createdBy": "oz7e2lIpbskD4KiPLGij",
            "dueBool": true,
            "due" : {
                "key": "",
                "amount": 90000,
                "countDues": 3,
                "actualCount": 1,
                "movementKey": "",
                "totalAmount": 90000
            } 
        },
        //aca
        {
            "key": "",
            "description": "Sueldo",
            "amount": 100000,
            "typeKey": '1',
            "categoryKey": "MYf10RFsecN8p3LibuiL",
            "year": 2023,
            "month": 4,
            "dueKey": null,
            "createdDate": null,
            "modifiedDate": null,
            "createdBy": "oz7e2lIpbskD4KiPLGij",
            "dueBool": false 
        },
        {
            "key": "",
            "description": "Coto",
            "amount": 30000,
            "typeKey": '2',
            "categoryKey": "MYf10RFsecN8p3LibuiL",
            "year": 2023,
            "month": 4,
            "dueKey": null,
            "createdDate": null,
            "modifiedDate": null,
            "createdBy": "oz7e2lIpbskD4KiPLGij",
            "dueBool": false 
        },
        {
            "key": "",
            "description": "Sueldo",
            "amount": 100000,
            "typeKey": '1',
            "categoryKey": "MYf10RFsecN8p3LibuiL",
            "year": 2023,
            "month": 5,
            "dueKey": null,
            "createdDate": null,
            "modifiedDate": null,
            "createdBy": "oz7e2lIpbskD4KiPLGij",
            "dueBool": false 
        },
        {
            "key": "",
            "description": "Coto",
            "amount": 50000,
            "typeKey": '2',
            "categoryKey": "MYf10RFsecN8p3LibuiL",
            "year": 2023,
            "month": 5,
            "dueKey": null,
            "createdDate": null,
            "modifiedDate": null,
            "createdBy": "oz7e2lIpbskD4KiPLGij",
            "dueBool": false 
        },
        {
            "key": "",
            "description": "TV",
            "amount": 120000,
            "typeKey": '2',
            "categoryKey": "MYf10RFsecN8p3LibuiL",
            "year": 2023,
            "month": 5,
            "dueKey": null,
            "createdDate": null,
            "modifiedDate": null,
            "createdBy": "oz7e2lIpbskD4KiPLGij",
            "dueBool": true,
            "due" : {
                "key": "",
                "amount": 120000,
                "countDues": 6,
                "actualCount": 1,
                "movementKey": "",
                "totalAmount": 120000
            } 
        },
        {
            "key": "",
            "description": "sueldo",
            "amount": 200000,
            "typeKey": '1',
            "categoryKey": "MYf10RFsecN8p3LibuiL",
            "year": 2023,
            "month": 6,
            "dueKey": null,
            "createdDate": null,
            "modifiedDate": null,
            "createdBy": "oz7e2lIpbskD4KiPLGij",
            "dueBool": false 
        },
        {
            "key": "",
            "description": "coto",
            "amount": 50000,
            "typeKey": '1',
            "categoryKey": "MYf10RFsecN8p3LibuiL",
            "year": 2023,
            "month": 6,
            "dueKey": null,
            "createdDate": null,
            "modifiedDate": null,
            "createdBy": "oz7e2lIpbskD4KiPLGij",
            "dueBool": false 
        },
        {
            "key": "",
            "description": "Cama",
            "amount": 90000,
            "typeKey": '2',
            "categoryKey": "MYf10RFsecN8p3LibuiL",
            "year": 2023,
            "month": 6,
            "dueKey": null,
            "createdDate": null,
            "modifiedDate": null,
            "createdBy": "oz7e2lIpbskD4KiPLGij",
            "dueBool": true,
            "due" : {
                "key": "",
                "amount": 90000,
                "countDues": 3,
                "actualCount": 1,
                "movementKey": "",
                "totalAmount": 90000
            } 
        }
    ]
    for(const element of addList){
        let dueEntity: Due;
        const newEntity: Movement = {
            key: element.key,
            description: element.description,
            amount: element.amount,
            typeKey: element.typeKey,
            categoryKey: element.categoryKey,
            year: element.year,
            month: element.month,
            dueKey: element.dueKey,
            createdDate: helper.getNowWithHours(),
            modifiedDate: '',
            createdBy: element.createdBy,
            dueBool: element.dueBool 
        }
        if(newEntity.dueBool == true) {
             dueEntity = {
                key: '',
                amount: element.due.totalAmount / element.due.countDues,
                actualCount: 1,
                countDues: element.due.countDues,
                movementKey: '',
                totalAmount: element.due.totalAmount
                
            }
            newEntity.amount = dueEntity.amount; 
            dueEntity.key = await dueService.add(dueEntity);
            newEntity.dueKey = dueEntity.key
        }
        newEntity.key = await movementService.add(newEntity)
        await movementService.edit(newEntity);
        if(newEntity.dueBool == true) {
            dueEntity.movementKey = newEntity.key;
            await dueService.edit(dueEntity);
        }
    }
    
   
    
   res.send(StatusCodes.ACCEPTED)
}  
  

 
// Exportamos las funciones en un objeto json para poder usarlas en otros fuera de este fichero
module.exports = {
    AddMovement
   
};
