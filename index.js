var express = require('express'); //llamamos a Express
var path = require('path');
var app = express();
const cors = require('cors');
const allowedOrigins = [
    'capacitor://localhost',
    'ionic://localhost',
    'http://localhost',
    'http://localhost:8080',
    'http://localhost:8100',
    'http://localhost:4200',
    'https://io-gastos-n4558w1n7-34499980s-projects.vercel.app',
    'https://io-gastos-git-master-34499980s-projects.vercel.app'
  ];
  const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Origin not allowed by CORS'));
      }
    },
  };
app.options('*', cors(corsOptions)); 
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
app.use('/api/category',cors(corsOptions), category_routes);
app.use('/api/user',cors(corsOptions), user_routes);
app.use('/api/movement',cors(corsOptions), movement_routes);
app.use('/api/type',cors(corsOptions), type_routes);
app.use('/api/due',cors(corsOptions), due_routes);
app.use('/api/test',cors(corsOptions), test_routes);
app.use('/api/totals',cors(corsOptions), total_routes);
app.use('/api/dataSource',cors(corsOptions), dataSource_routes);
app.use('/api/image',cors(corsOptions), image_routes);
// iniciamos nuestro servidor
app.listen(port);
console.log('API escuchando en el puerto ' + port);
