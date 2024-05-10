var express = require('express'); //llamamos a Express
var path = require('path');
var app = express();
const cors = require('cors');
app.use(function (req, res, next) {
    res.header("origin", 'http://localhost:4200');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use(express.json());
var port = process.env.PORT || 8080; // establecemos nuestro puerto
var category_routes = require('../API/routes/CategoryRoute');
var user_routes = require('../API/routes/UserRoute');
var movement_routes = require('../API/routes/MovementRoute');
var type_routes = require('../API/routes/TypeRoute');
var due_routes = require('../API/routes/DueRoute');
var total_routes = require('../API/routes/TotalRoute');
var test_routes = require('../API/routes/TestRoute');
var dataSource_routes = require('../API/routes/DataSourceRoute');
var image_routes = require('../API/routes/ImageRoute');
//app.use(bodyParser.urlencoded({extended:false}));
//app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
// Cargamos las rutas
app.use('/api/Category', category_routes);
app.use('/api/User', user_routes);
app.use('/api/Movement', movement_routes);
app.use('/api/Type', type_routes);
app.use('/api/Due', due_routes);
app.use('/api/Test', test_routes);
app.use('/api/Totals', total_routes);
app.use('/api/DataSource', dataSource_routes);
app.use('/api/Image', image_routes);
// iniciamos nuestro servidor
app.listen(port);
console.log('API escuchando en el puerto ' + port);
