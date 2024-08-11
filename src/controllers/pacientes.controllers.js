import {getConnection} from '../database/connection.js'

export const getPacientes = async (req, res) =>{

const pool = await getConnection();

const result = await pool.request().query('SELECT top 100 * FROM pacientes');



return res.json(result.recordset);

}
