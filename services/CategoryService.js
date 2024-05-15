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
exports.getByName = exports.getById = exports.getAll = exports.remove = exports.edit = exports.add = void 0;
const table = 'Category';
//const admin = require('firebase-admin')
const admin = require('firebase-admin');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, collection } = require('firebase-admin/firestore');
var serviceAccount = require("../gastosdiarios-e2f45-firebase-adminsdk-jesw0-d61e0f952c.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://gastosdiarios-e2f45-default-rtdb.firebaseio.com"
});
const firebaseConfig = {
    apiKey: "AIzaSyAJBXrm_vFWN-zpjuY6EHCQVPfYWtWE740",
    authDomain: "gastosdiarios-e2f45.firebaseapp.com",
    projectId: "gastosdiarios-e2f45",
    storageBucket: "gastosdiarios-e2f45.appspot.com",
    messagingSenderId: "436280068960",
    appId: "1:436280068960:web:ad9f396c062286f4a8ac05",
    measurementId: "G-XL8PN6CYMJ"
};
//const db = admin.database();
const db = admin.firestore();
// const db = admin.firestore();
function add(req) {
    return __awaiter(this, void 0, void 0, function* () {
        return db.collection(table)
            .add({
            key: '',
            name: req.name,
            image: req.image,
            createdDate: req.createdDate,
            modifiedDate: ''
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
            name: req.name,
            image: req.image,
            modifiedDate: req.modifiedDate,
            createdDate: req.createdDate
        });
    });
}
exports.edit = edit;
function remove(req) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db.collection(table).doc(req.body.key).delete();
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
function getByName(req) {
    return __awaiter(this, void 0, void 0, function* () {
        let entity;
        return yield db.collection(table).where("name", "==", req.body.name).get().then(snap => {
            snap.forEach(doc => {
                entity = doc.data();
            });
            return entity;
        });
    });
}
exports.getByName = getByName;
module.exports = {
    add,
    edit,
    remove,
    getAll,
    getByName,
    getById
};
//# sourceMappingURL=CategoryService.js.map