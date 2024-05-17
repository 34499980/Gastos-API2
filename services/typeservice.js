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
exports.getById = exports.getAll = exports.remove = exports.edit = exports.add = void 0;
const table = 'Type';
const admin = require('firebase-admin');
const db = admin.firestore();
function add(req) {
    return __awaiter(this, void 0, void 0, function* () {
        return db.collection(table)
            .add({
            key: '',
            description: req.description
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
function getById(req) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db.collection(table).doc(req.body.key).get().then(snap => {
            return snap.data();
        });
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
//# sourceMappingURL=typeservice.js.map