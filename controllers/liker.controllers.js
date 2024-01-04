const { pool } = require('../conexion');

async function createLiker(req, res){
    const { correo_usuario, comentario, puntuacion } = req.body;
    const query= 'SELECT puntuacion($1, $2, $3)';
    const values = [correo_usuario, comentario, puntuacion ];
    try{
        const client = await pool.connect();        
        const result= await client.query(query, values);              
        client.release();        
        if(result.rowCount > 0){
            res.status(200).json({message: 'Se guardo la puntuación'});
        }else{
            res.status(400).json({message: 'No se guardó el puntuación'});
        }       
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Error en el servidor'});
    }
}

module.exports = {
    createLiker
};