
import { getConnection, sql } from '../database/connection.js';

export const getProfesionales = async (req, res) => {
    try {
      const { Apellido, Dni } = req.query; // Obtenemos el parámetro Apellido desde la consulta
      

      const pool = await getConnection();
      const request = pool.request();
      let result;

        // Agregamos los parámetros al procedimiento almacenado
        if (Apellido) {
            request.input('Apellido', sql.VarChar, Apellido);
            result = await request.execute('sp_Buscar_Profesionales_Apellido');
        }

        if (Dni) {
          request.input('Dni',sql.Int, Dni);
          result = await request.execute('sp_Buscar_Profesionales_Dni');
      }


        // Ejecutamos el procedimiento almacenado
       

        // Devolvemos los resultados
        return res.json(result.recordset);

    } catch (error) {
        console.error('Error en la ejecución del procedimiento almacenado:', error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};

