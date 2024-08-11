import {getConnection} from '../database/connection.js'

export const getObrasSociales = async (req, res) =>{

const pool = await getConnection();

const result = await pool.request().query('SELECT top 100 * FROM ObrasSociales');



return res.json(result.recordset);

}