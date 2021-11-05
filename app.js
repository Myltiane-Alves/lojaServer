const express = require('express');
const app = express();
const morgan = require('morgan');
const moongose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler');

app.use(cors());
app.options('*', cors());

//Middleware'
app.use(express.json())
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);

//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require("./routes/users");
const ordersRoutes = require('./routes/orders');

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes)
app.use(`${api}/products`, productsRoutes)
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);


//Database
moongose.connect(process.env.CONECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'loja-db'
})
.then(()=> {
    console.log('Banco de Dados Conectado')
})
.catch((err) => {
    console.log(err);
})

//Server
app.listen(3000, () => {
    console.log('server is  running http://localhost:3000')
})

var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("Express is working on port " + port)
})