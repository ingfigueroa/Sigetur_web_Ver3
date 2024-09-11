
import { getConnection, sql } from '../database/connection.js';

export const getProfesionales = async (req, res) => {
    try {
      const { Apellido, VarDni, idprofesion } = req.query;

      const pool = await getConnection();
      const request = pool.request();
      let result;
      
      if (Apellido != null && Apellido != '') {
         
          request.input('Apellido', sql.VarChar, Apellido);
          result = await request.execute('sp_Buscar_Profesionales_Apellido');
      } else if (VarDni > 0) { 
          
          request.input('Dni', sql.Int, VarDni);
          result = await request.execute('sp_Buscar_Profesionales_Dni');

        } else if (idprofesion > 0) { 
          
          request.input('idprofesion', sql.Int, idprofesion);
          result = await request.execute('sp_Buscar_Profesionales_Profesion');
      } else {
        
        let Apellido = '';
        request.input('Apellido', sql.VarChar, Apellido);
        result = await request.execute('sp_Buscar_Profesionales_Apellido');
      }
      
      
      return res.json(result.recordset);
      

    } catch (error) {
        console.error('Error en la ejecución del procedimiento almacenado:', error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};

export const getProfesionalProfesion = async (req, res) => {
  try {
    const { idprofesional } = req.query;

    const pool = await getConnection();
    const request = pool.request();
    let result;
    
   

       if (idprofesional > 0) { 
       
        request.input('idprofesional', sql.Int, idprofesional);
        result = await request.execute('sp_Buscar_ProfesionalYProfesion_ID');
   
       }
    
    if (result && result.recordset) {
      // Procesar los resultados
      return res.json(result.recordset);
  } else {
      console.error('No se obtuvieron resultados de la consulta.');
  }
   
    

  } catch (error) {
      console.error('Error en la ejecución del procedimiento almacenado:', error);
      return res.status(500).json({ message: 'Error en el servidor' });
  }
};


export const createProfesionales = async (req, res) => {
  
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
        request.input('CuilCuit', sql.BigInt, CuitCuil);
        request.input('matprof', sql.VarChar, matriculanro);
        request.input('IDTipoProfesion', sql.Int, idtipoprofesion);

        request.output('RETORNO', sql.Int);
        request.output('Resultado', sql.Int);

        result = await request.execute('sp_crear_profesional');
   



    res.status(201).json({ 
      message: 'Profesional registrado exitosamente', 
      retorno, 
      resultado 
    });
  } catch (error) {
      console.error('Error en la ejecución del procedimiento almacenado:', error);
       res.status(500).json({ message: 'Error en el servidor' });
  }
};


