const express = require('express');
const cors = require('cors'); // Importa la biblioteca cors
const app = express();
const helmet = require('helmet');
app.use(helmet());

var usuario_routes = require('./routes/usuario.routes');
var instructores_routes = require('./routes/instructores.routes');
var credito_routes = require('./routes/creditos.routes');
var entrenamiento_routes = require('./routes/entrenamientos.routes');
var clases_routes = require('./routes/clases.routes');
var recuperacion_routes = require('./routes/recuperacion.routes');
var liker_routes = require('./routes/liker.routes');

// Middleware para manejar CORS
app.use(cors()); // Esto permitirá todas las solicitudes desde cualquier origen

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// rutas
app.use('/api', usuario_routes);
app.use('/api', instructores_routes);
app.use('/api', entrenamiento_routes);
app.use('/api', credito_routes);
app.use('/api', clases_routes);
app.use('/api', recuperacion_routes);
app.use('/api', liker_routes);

// Levantar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor en el puerto 3000');
});
