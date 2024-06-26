"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getById = exports.getAll = exports.remove = exports.edit = exports.add = void 0;
const service = __importStar(require("../services/typeservice"));
const http_status_codes_1 = require("http-status-codes");
const res = require('express/lib/response');
function add(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const entity = yield service.getAll();
        if (!entity.find(x => x.description == req.body.description)) {
            const newEntity = {
                description: req.body.description,
                key: ''
            };
            const key = yield service.add(newEntity);
            newEntity.key = key;
            service.edit(newEntity);
            res.status(http_status_codes_1.StatusCodes.CREATED).send({
                menssage: 'Se genero el tipo ' + req.body.description
            });
        }
        else {
            res.status(500).send({
                menssage: 'El tipo ' + req.body.description + ' ya existe'
            });
        }
    });
}
exports.add = add;
function edit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbEntity = yield service.getById(req);
        if (dbEntity == undefined || dbEntity.key == req.body.key) {
            const entity = {
                key: req.body.key,
                description: req.body.description
            };
            yield service.edit(entity);
            res.status(http_status_codes_1.StatusCodes.CREATED).send({
                menssage: 'Se actualizo el tipo ' + req.body.description
            });
        }
        else {
            res.status(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE).send({
                menssage: 'El tipo ' + req.body.description + ' ya existe'
            });
        }
    });
}
exports.edit = edit;
function remove(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbEntity = yield service.getById(req);
        if (dbEntity) {
            service.remove(req);
        }
        res.status(200).send({
            menssage: 'Se elimino el tipo: ' + dbEntity.description
        });
    });
}
exports.remove = remove;
function getAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let list = yield service.getAll();
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(list);
    });
}
exports.getAll = getAll;
function getById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let entity = yield service.getById(req);
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(entity);
    });
}
exports.getById = getById;
// Exportamos las funciones en un objeto json para poder usarlas en otros fuera de este fichero
module.exports = {
    add,
    edit,
    remove,
    getAll,
    getById
};
//# sourceMappingURL=typecontroller.js.map