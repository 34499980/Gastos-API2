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
exports.edit = exports.add = void 0;
const table = 'Image';
const admin = require('firebase-admin');
const db = admin.firestore();
// const db = admin.firestore();
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
            description: req.description
        });
    });
}
exports.edit = edit;
module.exports = {
    add,
    edit
};
