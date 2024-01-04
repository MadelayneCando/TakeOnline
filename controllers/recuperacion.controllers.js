const { pool } = require('../conexion');

async function recuperarClave(req, res){
    const { user_email, preg1, preg2, preg3 } = req.body;
    const query= 'SELECT VerificarPorConsola($1, $2, $3, $4)';
    const values = [ user_email, preg1, preg2, preg3 ];
    const vale = 'Validado';
    try{
        const client = await pool.connect();        
        const result= await client.query(query, values); 
        client.release();        
        //console.log(result.rows[0]);      
        if (result.rows.length === 1) {
            console.log(result);
            const clave = result.rows[0];
            if (clave.verificarporconsola === 'Validado') {
                res.json({ message: 'Si se va a recuperar' });
            } else {
                res.status(400).json({ error: 'No se va a recuperar' });
            }
        } else {
            res.status(404).json({ error: 'Correo no encontrado' }); //en si no funciona porq devuelve siemore algo
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Error en el servidor'});
    }
}

async function cambioClave(req, res){
    const { user_email, nueva_clave } = req.body;
    const query= 'SELECT cambiar_clave($1, $2)';
    const values = [ user_email, nueva_clave ];
    try{
        const client = await pool.connect();
        const result = await client.query(query, values);   
        client.release(); // suelta conexion, no conexion abierta       
        if(result.rowCount > 0){            
            res.status(200).json({message: 'Se cambió la clave'})
        }   else{
            res.status(400).json({message: 'No se cambió la clave'})
        }
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

module.exports={
    recuperarClave,
    cambioClave
};