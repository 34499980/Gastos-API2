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
exports.AddMovement = void 0;
const movementService = __importStar(require("../services/movementservice"));
const dueService = __importStar(require("../services/dueservice"));
const http_status_codes_1 = require("http-status-codes");
const helper = __importStar(require("../helpers/Time"));
const res = require('express/lib/response');
function AddMovement(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let addList = [
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
                "due": {
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
                "due": {
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
                "due": {
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
                "due": {
                    "key": "",
                    "amount": 90000,
                    "countDues": 3,
                    "actualCount": 1,
                    "movementKey": "",
                    "totalAmount": 90000
                }
            }
        ];
        for (const element of addList) {
            let dueEntity;
            const newEntity = {
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
            };
            if (newEntity.dueBool == true) {
                dueEntity = {
                    key: '',
                    amount: element.due.totalAmount / element.due.countDues,
                    actualCount: 1,
                    countDues: element.due.countDues,
                    movementKey: '',
                    totalAmount: element.due.totalAmount
                };
                newEntity.amount = dueEntity.amount;
                dueEntity.key = yield dueService.add(dueEntity);
                newEntity.dueKey = dueEntity.key;
            }
            newEntity.key = yield movementService.add(newEntity);
            yield movementService.edit(newEntity);
            if (newEntity.dueBool == true) {
                dueEntity.movementKey = newEntity.key;
                yield dueService.edit(dueEntity);
            }
        }
        res.send(http_status_codes_1.StatusCodes.ACCEPTED);
    });
}
exports.AddMovement = AddMovement;
// Exportamos las funciones en un objeto json para poder usarlas en otros fuera de este fichero
module.exports = {
    AddMovement
};
//# sourceMappingURL=testcontroller.js.map