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
exports.getById = exports.getByMonth = exports.getAllYears = exports.remove = exports.edit = exports.add = void 0;
const service = __importStar(require("../services/movementservice"));
const duesService = __importStar(require("../services/dueservice"));
const http_status_codes_1 = require("http-status-codes");
const helper = __importStar(require("../helpers/Time"));
const res = require('express/lib/response');
function add(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let dueEntity;
        const newEntity = {
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
        };
        if (newEntity.dueBool == true) {
            dueEntity = {
                key: '',
                amount: req.body.due.totalAmount / req.body.due.countDues,
                actualCount: 1,
                countDues: req.body.due.countDues,
                movementKey: '',
                totalAmount: req.body.due.totalAmount
            };
            newEntity.amount = dueEntity.amount;
            dueEntity.key = yield duesService.add(dueEntity);
            newEntity.dueKey = dueEntity.key;
        }
        newEntity.key = yield service.add(newEntity);
        yield service.edit(newEntity);
        if (newEntity.dueBool == true) {
            dueEntity.movementKey = newEntity.key;
            yield duesService.edit(dueEntity);
        }
        res.status(http_status_codes_1.StatusCodes.CREATED).send({
            menssage: 'Se genero el movimiento'
        });
    });
}
exports.add = add;
function edit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const dbEntity = yield getById(req, res);
        if (dbEntity != undefined) {
            const newEntity = {
                key: req.body.key,
                description: req.body.description,
                amount: req.body.amount,
                typeKey: req.body.typeKey,
                categoryKey: req.body.categoryKey,
                year: req.body.year,
                month: req.body.month,
                dueKey: req.body.dueKey,
                createdDate: req.body.createdDate,
                modifiedDate: helper.getNowWithHours(),
                createdBy: req.body.createdBy,
                dueBool: req.body.dueBool
            };
            if (newEntity.dueBool == true) {
                let due = yield duesService.getByMovementId(newEntity.key);
                due = {
                    key: due.key,
                    amount: (_a = req.body.due.totalAmount / req.body.due.countDues) !== null && _a !== void 0 ? _a : due.countDues,
                    actualCount: due.key == undefined ? 1 : due.actualCount,
                    countDues: (_b = req.body.due.countDues) !== null && _b !== void 0 ? _b : due.countDues,
                    movementKey: due.movementKey,
                    totalAmount: req.body.due.totalAmount
                };
                newEntity.amount = due.amount;
                yield duesService.edit(due);
            }
            service.edit(newEntity);
            res.status(http_status_codes_1.StatusCodes.CREATED).send({
                menssage: 'Se actualizo el movimiento'
            });
        }
    });
}
exports.edit = edit;
function remove(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let key = {};
        if (req.body.month == undefined) {
            key = req.query.key;
        }
        else {
            key = req.body.key;
        }
        console.log(key);
        const dbEntity = yield service.getById(key);
        if (dbEntity.dueBool) {
            const due = yield duesService.getByMovementId(dbEntity.key);
            yield duesService.remove(due);
        }
        if (dbEntity != undefined) {
            service.remove(key);
            res.status(http_status_codes_1.StatusCodes.ACCEPTED).send({
                menssage: 'Se elimino el movimiento'
            });
        }
    });
}
exports.remove = remove;
function getAllYears(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const list = yield service.getAllYears();
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(list);
    });
}
exports.getAllYears = getAllYears;
function getByMonth(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let date = {};
        if (req.body.month == undefined) {
            date = { month: req.query.month, year: req.query.year };
        }
        else {
            date = { month: req.body.month, year: req.body.year };
        }
        const list = yield service.getByMonth(date);
        const listResult = list.sort((a, b) => b.categoryKey.localeCompare(a.categoryKey));
        for (const element of listResult) {
            if (element.dueKey != '') {
                element.due = yield duesService.getByMovementId(element.dueKey);
            }
        }
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(listResult);
    });
}
exports.getByMonth = getByMonth;
function getById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = { key: req.body.key };
        const entity = yield service.getById(id);
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(entity);
    });
}
exports.getById = getById;
module.exports = {
    add,
    edit,
    remove,
    getAllYears,
    getByMonth,
    getById
};
//# sourceMappingURL=movementcontroller.js.map