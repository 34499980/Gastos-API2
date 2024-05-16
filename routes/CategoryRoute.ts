
import express from 'express';
 
// Cargamos el módulo de express para poder crear rutas
const app = express();
const router = express.Router();
// Cargamos el controlador
import * as Controller from '../controllers/categorycontroller';
 
// Llamamos al router

 
// Creamos una ruta de tipo GET para el método de pruebas
router.post('/add', Controller.add);
router.put('/edit', Controller.edit);
router.get('/remove', Controller.remove);
router.get('/getAll', Controller.getAll);
router.get('/getByName', Controller.getByName);
router.get('/getById', Controller.getById);
app.use(router);
// Exportamos la configuración
module.exports = router;
