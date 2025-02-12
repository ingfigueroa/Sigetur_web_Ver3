
import { getConnection, sql } from '../database/connection.js';

export const getCapitulos = async (req, res) => {
  const { idprofesion } = req.query;
 
    try {
           
      const pool = await getConnection();
      const request = pool.request(); 
      let result; 
          
      request.input('idprofesion', sql.Int, idprofesion); 

      result = await request.execute('sp_Buscar_prestaciones_por_profesion');
           
      return res.json(result.recordset); 
      
    } catch (error) {
        console.error('Error en la ejecución del procedimiento almacenado - CAPITULOS:', error);
        return res.status(500).json({ message: 'Error en el servidor' });
    } 
};

export const getPrestaciones = async (req, res) => {
  const { idcapitulo } = req.query;
    try {
           
      const pool = await getConnection();
      const request = pool.request();
      let result;
           
      request.input('idcapitulo', sql.Int, idcapitulo);
      result = await request.execute('sp_Buscar_prestaciones_por_capitulo');
           
      return res.json(result.recordset);
      
    } catch (error) {
        console.error('Error en la ejecución del procedimiento almacenado:', error);
        return res.status(500).json({ message: 'Error en el servidor' });
    } 
};


export const getPrestacion = async (req, res) => {
  const { idprestacion } = req.query;
    try {
           
      const pool = await getConnection();
      const request = pool.request();
      let result;
          
      request.input('idprestacion', sql.Int, idprestacion);
      result = await request.execute('sp_Buscar_prestacion');
           
      return res.json(result.recordset);
      
    } catch (error) {
        console.error('Error en la ejecución del procedimiento almacenado:', error);
        return res.status(500).json({ message: 'Error en el servidor' });
    } 
};