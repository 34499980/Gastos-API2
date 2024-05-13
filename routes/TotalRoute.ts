
import express from 'express';
 
// Cargamos el módulo de express para poder crear rutas
const app = express();
const router = express.Router();
// Cargamos el controlador
import * as Controller from '../controllers/totalcontroller';
 
// Llamamos al router

 
// Creamos una ruta de tipo GET para el método de pruebas
router.get('/processTotals', Controller.processTotals);
router.get('/removeByMonths', Controller.removeByMonths);
router.get('/removeOldDues', Controller.removeOldDues);
router.get('/getAll', Controller.getAll);
router.get('/getById', Controller.getById);
router.get('/getByMonth', Controller.getByMonth);
app.use(router);
// Exportamos la configuración
module.exports = router;
