import { User } from '../models/UserModel';
import * as service from  '../services/ImageService';
import * as ImageService from  '../services/ImageService';
import {StatusCodes} from 'http-status-codes';
import { Movement } from '../models/MovementModel';
import { Due } from '../models/DuesModel';
import * as helper from '../helpers/Time';
import { Item } from '../models/ItemModel';
const res = require('express/lib/response');

export async function add(req, res){   
   
    const newEntity: Item = {
        key: '',
        description: req.body.description
    }  
    newEntity.key = await service.add(newEntity);
    
    
    await service.edit(newEntity);   
    
    res.status(StatusCodes.CREATED). send({
        menssage: 'Se genero la imagen'
    });
}    
export async function edit(req, res){     
   
  
        const newEntity: Item = {
            key: req.body.key,
            description: req.body.description,
            image: req.body.image 
        }
        service.edit(newEntity);
        res.status(StatusCodes.CREATED).send({
            menssage: 'Se actualizo la imagen'
     });
    
}
 
 
module.exports = {
    add,
    edit
};
