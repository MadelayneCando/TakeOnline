const { pool } = require('../conexion');

async function createCreditos(req, res){
    const { cre_precio, cre_cantidad, cre_detalles } = req.body;
    const query= 'SELECT insertar_credito($1, $2, $3)';
    const values = [cre_precio, cre_cantidad, cre_detalles];
    try{
        const client = await pool.connect();         
        const result= await client.query(query, values);              
        client.release();        
        if(result.rowCount > 0){
            res.status(200).json({message: 'Se guardo el credito'});
        }else{
            res.status(400).json({message: 'No se guardo el credito'});
        }       
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Error en el servidor'});

    }
}

async function getCreditos(req, res){ // req= requerimientos 
    try{
        const client = await pool.connect();
        const result = await client.query('select * from creditos');
        client.release(); 
        res.json(result.rows);        
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}   

async function shopCreditos(req, res){
    const { idusuario, idcreditos } = req.body;    
    const query= 'SELECT insertar_facturacreditos($1, $2)';
    const values = [ idusuario, idcreditos ];
    try{
        const client = await pool.connect();        
        const result= await client.query(query, values);              
        client.release();        
        if(result.rowCount > 0){
            res.status(200).json({message: 'Se compró los creditos'}); 
        }else{
            res.status(400).json({message: 'No se compró los creditos'});
        }       
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Error en el servidor'});
    }
}

module.exports={
    createCreditos,
    getCreditos,
    shopCreditos
};