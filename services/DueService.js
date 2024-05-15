"use strict";
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
exports.getByMovementId = exports.getAllWithMovement = exports.getAll = exports.remove = exports.edit = exports.add = void 0;
const table = 'Due';
const admin = require('firebase-admin');
const db = admin.firestore();
function add(req) {
    return __awaiter(this, void 0, void 0, function* () {
        return db.collection(table)
            .add({
            key: '',
            amount: req.amount,
            actualCount: req.actualCount,
            countDues: req.countDues,
            movementKey: req.movementKey,
            totalAmount: req.totalAmount
        }).then(response => {
            return response.id;
        });
    });
}
exports.add = add;
function edit(req) {
    return __awaiter(this, void 0, void 0, function* () {
        var ref = db.collection(table);
        var upref = ref.doc(req.key);
        upref.update({
            key: req.key,
            amount: req.amount,
            actualCount: req.actualCount,
            countDues: req.countDues,
            movementKey: req.movementKey,
            totalAmount: req.totalAmount
        });
    });
}
exports.edit = edit;
function remove(req) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db.collection(table).doc(req.key).delete();
    });
}
exports.remove = remove;
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        let list = [];
        return yield db.collection(table).get().then(snap => {
            snap.forEach(doc => {
                list.push(doc.data());
            });
            return list;
        });
    });
}
exports.getAll = getAll;
function getAllWithMovement() {
    return __awaiter(this, void 0, void 0, function* () {
        let list = [];
        return yield db.collection('Movement').where("dueKey", "!=", '').get().then(snap => {
            snap.forEach(doc => {
                list.push(doc.data());
            });
            return list;
        });
    });
}
exports.getAllWithMovement = getAllWithMovement;
function getByMovementId(key) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db.collection(table).doc(key).get().then(snap => {
            return snap.data();
        });
    });
}
exports.getByMovementId = getByMovementId;
module.exports = {
    add,
    edit,
    remove,
    getAll,
    getByMovementId,
    getAllWithMovement
};
//# sourceMappingURL=DueService.js.map