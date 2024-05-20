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
exports.getAllWithMovement = exports.getAll = exports.processByMonth = void 0;
const service = __importStar(require("../services/dueservice"));
const movementService = __importStar(require("../services/movementservice"));
const http_status_codes_1 = require("http-status-codes");
const helper = __importStar(require("../helpers/Time"));
const res = require('express/lib/response');
function processByMonth(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const list = yield service.getAll();
        if (list.length > 0) {
            const listToUpdate = list.filter(x => x.actualCount != x.countDues);
            const listToRemove = list.filter(x => x.actualCount == x.countDues);
            for (const element of listToRemove) {
                yield service.remove(element);
            }
            for (const element of listToUpdate) {
                element.actualCount++;
                // const id = {key: };
                const movement = yield movementService.getById(element.movementKey);
                const newMovement = {
                    key: '',
                    description: movement.description,
                    amount: movement.amount,
                    typeKey: movement.typeKey,
                    categoryKey: movement.categoryKey,
                    year: new Date().getFullYear(),
                    month: new Date().getMonth() + 1,
                    dueKey: movement.dueKey,
                    createdDate: helper.getNowWithHours(),
                    modifiedDate: '',
                    createdBy: 'System',
                    dueBool: true
                };
                newMovement.key = yield movementService.add(newMovement);
                yield movementService.edit(newMovement);
                yield service.edit(element);
            }
        }
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({ status: true });
    });
}
exports.processByMonth = processByMonth;
function getAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let list = yield service.getAll();
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(list);
    });
}
exports.getAll = getAll;
function getAllWithMovement(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let list = yield service.getAllWithMovement();
        for (const element of list) {
            if (element.dueKey != '') {
                element.due = yield service.getByMovementId(element.dueKey);
                console.log(element.due);
            }
        }
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(list.filter(x => x.due != undefined));
    });
}
exports.getAllWithMovement = getAllWithMovement;
module.exports = {
    processByMonth,
    getAll,
    getAllWithMovement
};
//# sourceMappingURL=duecontroller.js.map