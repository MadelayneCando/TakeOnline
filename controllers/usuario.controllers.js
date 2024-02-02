const { pool } = require('../conexion');

async function createUsuarios(req, res){
    const { user_cedula, user_nombre, user_apellido, user_email, user_telefono, user_direccion, 
        user_peso, user_altura, user_contraseña, preg1, preg2, preg3 } = req.body;
    const query= 'SELECT insertar_usuario($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)';
    const values = [user_cedula, user_nombre, user_apellido, user_email, user_telefono, user_direccion, 
        user_peso, user_altura, user_contraseña, preg1, preg2, preg3];
    try{
        const client = await pool.connect();        
        const result= await client.query(query, values);              
        client.release();        
        if(result.rowCount > 0){
            res.status(200).json({message: 'Se guardo el usuario'});
        }else{
            res.status(400).json({message: 'No se guardo el usuario'});
        }       
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Error en el servidor'});

    }
}

//Inicia sesion
async function validarCorreo(req, res) {
    const { user_email, user_contraseña } = req.body;
    try {
        const client = await pool.connect();
        const query = 'SELECT * FROM usuarios WHERE user_email = $1';
        const result = await client.query(query, [user_email]);
        client.release(); 
        if (result.rows.length === 1) {
            console.log(result);
            const usuario = result.rows[0];
            if (usuario.user_contraseña === user_contraseña) {
                res.json({ message: 'Inicio de sesión exitoso', usuario });
            } else {
                res.status(401).json({ error: 'Contraseña incorrecta' });
            }
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

async function updateUsuario(req, res){
    const { user_email, user_cedula, user_nombre, user_apellido, user_telefono, 
        user_direccion, user_peso, user_altura } = req.body;
    const query = 'SELECT editar_usuario($1, $2, $3, $4, $5, $6, $7, $8)';
    const values = [user_email, user_cedula, user_nombre, user_apellido, user_telefono,
        user_direccion, user_peso, user_altura];
    try{
        const client = await pool.connect();
        const result = await client.query(query, values);   
        client.release(); // suelta conexion, no conexion abierta       
        if(result.rowCount > 0){            
            res.status(200).json({message: 'Se actualizó usuario'})
        }   else{
            res.status(400).json({message: 'No existe usuario'})
        }
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function getUsuarios(req, res){ // req= requerimientos 
    try{
        const client = await pool.connect();
        const result = await client.query('SELECT idusuario, idtipo, user_cedula, user_nombre, user_apellido, user_email, user_telefono, user_direccion, user_peso, user_altura, user_estado, user_creditosrestantes, user_foto FROM usuarios');
        client.release(); // suelta conexion, no conexion abierta
        res.json(result.rows);        
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function getUsuario(req, res){ // req= requerimientos 
    const {id} = req.params; // se puede o no poner .id
    const query = 'SELECT idusuario, idtipo, user_cedula, user_nombre, user_apellido, user_email, user_telefono, user_direccion, user_peso, user_altura, user_estado, user_creditosrestantes, user_foto from usuarios where idusuario = $1'
    const values = [id];
    try{
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release(); // suelta conexion, no conexion abierta
        if(result.rowCount > 0){
            res.status(200).json(result.rows);
        }   else{
            res.status(500).json({message: 'No existe'})
        }
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function deleteUsuario(req, res){ // req= requerimientos 
    const {id} = req.params; // se puede o no poner .id
    const query = 'Delete from usuarios where idusuario = $1'
    const values = [id];
    try{
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release(); // suelta conexion, no conexion abierta
        if(result.rowCount > 0){
            res.status(200).json({message: 'Usuario eliminada'})
        }   else{
            res.status(500).json({message: 'No existe'})
        }
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function cambiaUsuario(req, res){ // req= requerimientos 
    const { p_user_email} = req.body; // se puede o no poner .id
    const query = 'Select estado_usuario($1)'
    const values = [ p_user_email];
    try{
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release(); 
        if(result.rowCount > 0){
            res.status(200).json({message: 'Usuario cambia estado'})
        }   else{
            res.status(500).json({message: 'Usuario NO cambia estado'})
        }
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

module.exports = {
    createUsuarios,
    getUsuarios,
    updateUsuario,
    getUsuario,
    deleteUsuario,
    validarCorreo,
    cambiaUsuario
};