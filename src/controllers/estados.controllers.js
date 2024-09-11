import {getConnection} from '../database/connection.js'

export const getEstados = async (req, res) =>{


  
const pool = await getConnection();

const result = await pool.request().query('SELECT * FROM estados');



return res.json(result.recordset);

}
