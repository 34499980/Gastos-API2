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
exports.getMinorMonth = exports.getByMonth = exports.getById = exports.getAllYears = exports.remove = exports.edit = exports.add = void 0;
const table = 'Movement';
const admin = require('firebase-admin');
const db = admin.firestore();
function add(req) {
    return __awaiter(this, void 0, void 0, function* () {
        return db.collection(table)
            .add({
            key: '',
            description: req.description,
            amount: req.amount,
            typeKey: req.typeKey,
            categoryKey: req.categoryKey,
            year: req.year,
            month: req.month,
            dueKey: req.dueKey,
            createdDate: req.createdDate,
            modifiedDate: '',
            createdBy: req.createdBy
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
            description: req.description,
            amount: req.amount,
            typeKey: req.typeKey,
            categoryKey: req.categoryKey,
            year: req.year,
            month: req.month,
            dueKey: req.dueKey,
            createdDate: req.createdDate,
            modifiedDate: req.modifiedDate,
            createdBy: req.createdBy
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
function getAllYears() {
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
exports.getAllYears = getAllYears;
function getById(req) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db.collection(table).doc(req.key).get().then(snap => {
            return snap.data();
        });
    });
}
exports.getById = getById;
function getByMonth(req) {
    return __awaiter(this, void 0, void 0, function* () {
        let list = [];
        const month = Number(req.month);
        const year = Number(req.year);
        return yield db.collection(table).where("month", "==", month)
            .where("year", "==", year)
            .get().then(snap => {
            snap.forEach(doc => {
                list.push(doc.data());
            });
            return list;
        });
    });
}
exports.getByMonth = getByMonth;
function getMinorMonth(req) {
    return __awaiter(this, void 0, void 0, function* () {
        let list = [];
        const month = Number(req.month);
        const year = Number(req.year);
        return yield db.collection(table)
            .where("year", "<=", year)
            .get().then(snap => {
            snap.forEach(doc => {
                list.push(doc.data());
            });
            return list;
        });
    });
}
exports.getMinorMonth = getMinorMonth;
module.exports = {
    add,
    edit,
    remove,
    getAllYears,
    getByMonth,
    getById,
    getMinorMonth
};
//# sourceMappingURL=MovementService.js.map