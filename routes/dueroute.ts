
import express from 'express';
 
// Cargamos el módulo de express para poder crear rutas
const app = express();
const router = express.Router();
// Cargamos el controlador
import * as Controller from '../controllers/duecontroller';
 
// Llamamos al router

 
// Creamos una ruta de tipo GET para el método de pruebas
router.get('/processByMonth', Controller.processByMonth);
router.get('/getAll', Controller.getAll);
router.get('/getAllWithMovement', Controller.getAllWithMovement);
app.use(router);
// Exportamos la configuración
module.exports = router;
