const { pool } = require('../conexion');

async function verificarClase(req, res){
    const { p_identrenamiento, p_cla_fecha } =req.body;
    const query= 'SELECT * from obtener_datos_clase($1, $2)';
    const values = [ p_identrenamiento, p_cla_fecha ]; 
    try{
        const client = await pool.connect();        
        const result= await client.query(query, values);               
        client.release();        
        if(result.rowCount > 0){   
            res.status(200).json(result.rows);  
        }else{
            res.status(400).json('No hay clase');
        }       
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Error en el servidor'});
    }
}

async function createClase(req, res){
    const { p_identrenamiento, p_identrenador, p_cla_fecha, p_cla_preciocreditos, p_cla_hora, p_cla_descripcion, p_cla_cupo } = req.body;
    const query= 'SELECT insertar_clase($1, $2, $3, $4, $5, $6, $7)';
    const values = [ p_identrenamiento, p_identrenador, p_cla_fecha, p_cla_preciocreditos, p_cla_hora, p_cla_descripcion, p_cla_cupo ];
    try{
        const client = await pool.connect();        
        const result= await client.query(query, values);              
        client.release();        
        if(result.rowCount > 0){
            res.status(200).json({message: 'Se creo la clase'});
        }else{
            res.status(400).json({message: 'No se creó la clase'});
        }        
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Error en el servidor'});
    }
}

async function updateClase(req, res){
    const { p_idclase, p_identrenador, p_identrenamiento, p_cla_fecha, p_cla_preciocreditos, 
        p_cla_hora, p_cla_descripcion, p_cla_cupo } = req.body;
    const query = 'SELECT editar_clase($1, $2, $3, $4, $5, $6, $7, $8)';
    const values = [ p_idclase, p_identrenador, p_identrenamiento, p_cla_fecha, p_cla_preciocreditos, 
        p_cla_hora, p_cla_descripcion, p_cla_cupo ]; 
    try{
        const client = await pool.connect(); 
        const result = await client.query(query, values);   
        client.release();      
        if(result.rowCount > 0){            
            res.status(200).json({message: 'Se actualizó clase'})
        }   else{
            res.status(400).json({message: 'No existe clase'})
        }
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function agregarClase(req, res){
    const { idusuario, idclase  } = req.body;
    const query= 'SELECT insertar_facturaagenda($1, $2)';
    const values = [ idusuario, idclase ];
    try{
        const client = await pool.connect();        
        const result= await client.query(query, values);              
        client.release();        
        if(result.rowCount > 0){
            res.status(200).json({message: 'Se creo la clase'});
        }else{
            res.status(400).json({message: 'No se guardo la clase'});
        }        
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Error en el servidor'});
    }
}

async function verUsuarios(req, res){ // req= requerimientos //MUESTRA USUARIO POR CLASE
    const { idclase  } = req.body;
    try{
        const client = await pool.connect();
        const query= 'SELECT * FROM MostrarUsuariosPorClase($1)';
        const values = [ idclase ];
        const result= await client.query(query, values);       
        client.release(); // suelta conexion, no conexion abierta 
        res.json(result.rows);        
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function verUsuariosPorClase(req, res){ // req= requerimientos //MUESTRA USUARIO POR CLASE
    const { email_usuario  } = req.body;
    try{
        const client = await pool.connect();
        const query= 'SELECT * FROM clasesregistradasusuario($1)';
        const values = [ email_usuario ];
        const result= await client.query(query, values);       
        client.release(); // suelta conexion, no conexion abierta 
        res.json(result.rows);        
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function obtenerClaseSemanales(req, res){ 
    try{
        const client = await pool.connect();
        const query= 'SELECT * FROM ObtenerClasesSemanales()';
        const result= await client.query(query);       
        client.release(); 
        res.json(result.rows);        
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function getClases(req, res){ 
    try{
        const client = await pool.connect();
        const query= 'SELECT * FROM clases';
        const result= await client.query(query);       
        client.release(); 
        res.json(result.rows);        
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function cambiaClase(req, res){ // req= requerimientos 
    const {id} = req.body; // se puede o no poner .id
    const query = 'Select estado_clase($1)'
    const values = [id];
    try{
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release(); // suelta conexion, no conexion abierta
        if(result.rowCount > 0){
            res.status(200).json({message: 'Clase cambia estado'})
        }   else{
            res.status(500).json({message: 'Clase NO cambia estado'})
        }
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}



module.exports={
    verificarClase,
    agregarClase,
    verUsuarios,
    obtenerClaseSemanales,
    createClase,
    getClases,
    updateClase,
    cambiaClase,
    verUsuariosPorClase
};
