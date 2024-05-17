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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Cargamos el módulo de express para poder crear rutas
const app = (0, express_1.default)();
const router = express_1.default.Router();
// Cargamos el controlador
const Controller = __importStar(require("../controllers/categorycontroller"));
// Llamamos al router
// Creamos una ruta de tipo GET para el método de pruebas
router.post('/add', Controller.add);
router.put('/edit', Controller.edit);
router.delete('/remove', Controller.remove);
router.get('/removeget', Controller.remove);
router.get('/getAll', Controller.getAll);
router.get('/getByName', Controller.getByName);
router.get('/getById', Controller.getById);
app.use(router);
// Exportamos la configuración
module.exports = router;
//# sourceMappingURL=categoryroute.js.map