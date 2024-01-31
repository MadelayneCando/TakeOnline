const { Pool } = require('pg');

const pool = new Pool({ //obj pool tiene cadena de conexiones entre postgres y vs
    host: 'dpg-cmb3v95a73kc73bp4pjg-a', 
    user: 'proyectogymk_user',
    password: 'MXEWLOl8i9xhK4xqMsHDiOawpiYr22RW',
    database: 'proyectogymk',       
    port: '5432',
    ssl: {
        rejectUnauthorized: false, // Esto puede ser necesario en entornos de desarrollo, pero NO es recomendado en producción
    } 
});

module.exports = { pool };