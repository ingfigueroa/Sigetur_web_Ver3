import {getConnection, sql} from '../database/connection.js';


export const getObrasSocialesPorPaciente = async (req, res) => {
  
  const { idPaciente } = req.query;  // Se obtiene el idPaciente desde los parámetros de la ruta

 
  
  try {
      const pool = await getConnection();
      const request = pool.request();
      let result;

      
      request.input('idpaciente', sql.Int, idPaciente);
 
      result = await request.execute('sp_obras_sociales_por_paciente');
    
    return res.json(result.recordset);
    
  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    return res.status(500).json({ message: 'Error en el servidor' }); // Enviar un mensaje de error al cliente
  } 
};




export const getObrasSociales = async (req, res) =>{

try {
  
const pool = await getConnection();

const result = await pool.request().query('SELECT top 100 * FROM ObrasSociales');



return res.json(result.recordset);
} catch (error) {
  console.error('Error en la ejecución del procedimiento almacenado:', error);
  return res.status(500).json({ message: 'Error en el servidor' }); // Enviar un mensaje de error al cliente
}
};


