const { pool } = require('../conexion');

async function getInstructores(req, res){ // req= requerimientos 
    try{
        const client = await pool.connect();
        const result = await client.query('select * from entrenador');
        client.release(); // suelta conexion, no conexion abierta
        res.json(result.rows);        
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function createInstructores(req, res){
    const { p_idespecializacion, p_en_cedula, p_en_nombre, p_en_apellido, p_en_telefono, p_en_direccion,
        p_en_sueldo, p_en_descripcion, p_en_foto } = req.body;
    const query= 'SELECT insertar_entrenador($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    const values = [p_idespecializacion, p_en_cedula, p_en_nombre, p_en_apellido, p_en_telefono, p_en_direccion,
        p_en_sueldo, p_en_descripcion, p_en_foto ];
    try{
        const client = await pool.connect();        
        const result= await client.query(query, values);              
        client.release();        
        if(result.rowCount > 0){
            res.status(200).json({message: 'Se guardo el instructor'});
        }else{
            res.status(400).json({message: 'No se guardo el instructor'});
        }       
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Error en el servidor'});
    }
}

async function updateInstructores(req, res){
    const { en_cedula, en_nombre, en_apellido,
        en_telefono, en_direccion, en_sueldo, en_descripcion } = req.body;
    const query = 'UPDATE entrenador SET en_nombre=$2, en_apellido=$3, en_telefono=$4, en_direccion=$5, en_sueldo=$6, en_descripcion=$7 where en_cedula=$1';
    const values = [en_cedula, en_nombre, en_apellido,
        en_telefono, en_direccion, en_sueldo, en_descripcion ];
    try{
        const client = await pool.connect();
        const result = await client.query(query, values);   
        client.release(); // suelta conexion, no conexion abierta       
        if(result.rowCount > 0){            
            res.status(200).json({message: 'Se actualizó instructores'})
        }   else{
            res.status(400).json({message: 'No existe instructores'})
        }
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function deleteInstructor(req, res){
    const {cedula}= req.params;
    const query= 'SELECT cambiar_estado($1)';
    const values=[cedula];
    try{
        const client = await pool.connect();
        const result = await client.query(query, values);   
        client.release(); // suelta conexion, no conexion abierta       
        if(result.rowCount > 0){            
            res.status(200).json({message: 'Se cambió estado del instructor'})
        }   else{
            res.status(400).json({message: 'No se cambió el estado del instructor'})
        }
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function getInstructor(req, res){ // req= requerimientos 
    const {id} = req.params; // se puede o no poner .id
    const query = 'Select * from entrenador where identrenador = $1';
    const values = [id];
    try{
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release(); // suelta conexion, no conexion abierta
        if(result.rowCount > 0){
            res.status(200).json(result.rows);
        }else{
            res.status(500).json({message: 'No existe'})
        }
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}


module.exports ={
    getInstructores,
    createInstructores,
    updateInstructores,
    getInstructor,
    deleteInstructor
} ;