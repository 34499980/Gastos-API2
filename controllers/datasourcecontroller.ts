
import { StatusCodes } from 'http-status-codes';
import * as helper from '../helpers/Time';
const res = require('express/lib/response');
import * as service from  '../services/datasourceservice';

export async function getCategories(req, res){
    let list = await service.getCategories()
    const listResult = list.sort((a,b) => b.description.localeCompare(a.description));

    res.status(StatusCodes.ACCEPTED).json(listResult);
 }
 export async function getImages(req, res){
    let list = await service.getImages()
    res.status(StatusCodes.ACCEPTED).json(list);
 }
 export async function getTypes(req, res){
    let list = await service.getTypes()
    res.status(StatusCodes.ACCEPTED).json(list);
 }
 
 
// Exportamos las funciones en un objeto json para poder usarlas en otros fuera de este fichero
module.exports = {
    getCategories,
    getImages,
    getTypes
};
