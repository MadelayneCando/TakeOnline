const { pool } = require('../conexion');

async function getEntrenamientos(req, res){ // req= requerimientos 
    try{
        const client = await pool.connect();
        const result = await client.query('select * from entrenamiento');
        client.release(); // suelta conexion, no conexion abierta
        res.json(result.rows);        
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

module.exports = {
    getEntrenamientos
};