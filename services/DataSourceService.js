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
exports.getTypes = exports.getImages = exports.getCategories = void 0;
const table = 'DataSource';
const admin = require('firebase-admin');
const db = admin.firestore();
// const db = admin.firestore();
function getCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        let list = [];
        return yield db.collection('Category').get().then(snap => {
            snap.forEach(doc => {
                const item = {
                    key: doc.data().key,
                    description: doc.data().name,
                    image: doc.data().image
                };
                list.push(item);
            });
            return list;
        });
    });
}
exports.getCategories = getCategories;
function getImages() {
    return __awaiter(this, void 0, void 0, function* () {
        let list = [];
        return yield db.collection('Image').get().then(snap => {
            snap.forEach(doc => {
                const item = {
                    key: doc.data().key,
                    description: doc.data().description
                };
                list.push(item);
            });
            return list;
        });
    });
}
exports.getImages = getImages;
function getTypes() {
    return __awaiter(this, void 0, void 0, function* () {
        let list = [];
        return yield db.collection('Type').get().then(snap => {
            snap.forEach(doc => {
                const item = {
                    key: doc.data().key,
                    description: doc.data().description
                };
                list.push(item);
            });
            return list;
        });
    });
}
exports.getTypes = getTypes;
module.exports = {
    getCategories,
    getImages,
    getTypes
};
//# sourceMappingURL=DataSourceService.js.map