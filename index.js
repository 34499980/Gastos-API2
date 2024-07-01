var express = require('express'); //llamamos a Express
var path = require('path');
var app = express();
const cors = require('cors');
app.use(function (req, res, next) {
   // res.header("origin", '*');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Credentials', true");
    next();
});
app.use(express.json());
var port = process.env.PORT || 8080; // establecemos nuestro puerto
var category_routes = require('./routes/categoryroute');
var user_routes = require('./routes/userroute');
var movement_routes = require('./routes/movementroute');
var type_routes = require('./routes/typeroute');
var due_routes = require('./routes/dueroute');
var total_routes = require('./routes/totalroute');
var test_routes = require('./routes/testroute');
var dataSource_routes = require('./routes/datasourceroute');
var image_routes = require('./routes/imageroute');
//app.use(bodyParser.urlencoded({extended:false}));
//app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
// Cargamos las rutas
app.use('/api/category', category_routes);
app.use('/api/user', user_routes);
app.use('/api/movement', movement_routes);
app.use('/api/type', type_routes);
app.use('/api/due', due_routes);
app.use('/api/test', test_routes);
app.use('/api/totals', total_routes);
app.use('/api/dataSource', dataSource_routes);
app.use('/api/image', image_routes);
// iniciamos nuestro servidor
app.listen(port);
console.log('API escuchando en el puerto ' + port);
