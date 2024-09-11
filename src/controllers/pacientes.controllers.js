
import { getConnection, sql } from '../database/connection.js';

export const getPacientes = async (req, res) => {
    try {
      const { Apellido, VarDni } = req.query;



      
      
      const pool = await getConnection();
      const request = pool.request();
      let result;
      
      if (Apellido != null && Apellido != '') {
         
          request.input('Apellido', sql.VarChar, Apellido);
          result = await request.execute('sp_Buscar_Pacientes_Apellido');
      } else if (VarDni > 0) {
       
          request.input('Dni', sql.Int, VarDni);
          result = await request.execute('sp_Buscar_Pacientes_Dni');
      } else {
       
        let Apellido = '';
        request.input('Apellido', sql.VarChar, Apellido);
        result = await request.execute('sp_Buscar_Pacientes_Apellido');
      }
      
      
      return res.json(result.recordset);
      
    } catch (error) {
      console.error('Error en la ejecución del procedimiento almacenado:', error);
      return res.status(500).json({ message: 'Error en el servidor' }); // Enviar un mensaje de error al cliente
    }
  };


export const createPacientes = async (req, res) => {
  
  const { Nombres, Apellido, TipoDocumento, NroDocumento, EMail, FechaNacimiento, TECelular, Sexo, CuitCuil, matriculanro, idtipoprofesion } = req.body || {};

try{
  const pool = await getConnection();
  const request = pool.request();
  let result;



 /*  Los nombres de los paràmetros tienen que coincidir con estan definidos en el proce almacenado
 console.log('Profesional registrado exitosamente'); */
      request.input('Nombres', sql.VarChar, Nombres);
      request.input('Apellido', sql.VarChar, Apellido);
      request.input('TipoDocumento', sql.Int, TipoDocumento);
      request.input('NroDocumento', sql.Int, NroDocumento);
      request.input('EMail', sql.VarChar, EMail);
      request.input('FechaNacimiento', sql.Date, FechaNacimiento);
      request.input('TECelular', sql.VarChar, TECelular);
      request.input('Sexo', sql.VarChar, Sexo);
      

      request.output('RETORNO', sql.Int);
      request.output('Resultado', sql.Int);

      result = await request.execute('sp_crear_paciente');
     // Recuperación de los valores de los parámetros de salida
  const retorno = result.output.RETORNO;
  const resultado = result.output.Resultado;

  res.status(201).json({ 
    message: 'Paciente registrado exitosamente', 
    retorno, 
    resultado 
  });
  
} catch (error) {
  console.error('Error en la ejecución del procedimiento almacenado:', error);
  return res.status(500).json({ message: 'Error en el servidor' }); // Enviar un mensaje de error al cliente
} 
};
