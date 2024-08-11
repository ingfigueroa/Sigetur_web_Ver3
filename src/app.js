import express from 'express';
import estadosRoutes from './routes/estados.routes.js';
import profesionmalesRoutes from './routes/profesionales.routes.js';
import pacientesRoutes from './routes/pacientes.routes.js';
import obrassocialesRoutes from './routes/obrassociales.routes.js';

import cors from 'cors';


const app = express()

app.get('/', (req,res) =>{
  res.send('Bienvenido a SIGETUR')
})


app.use(cors({
  origin: 'http://localhost:5173',  // Permite solicitudes desde tu origen específico
  methods: ['GET', 'POST'],          // Permite solo métodos GET y POST, por ejemplo
  allowedHeaders: ['Content-Type'],  // Permite solo ciertos encabezados
}));

app.use(estadosRoutes);
app.use(profesionmalesRoutes);
app.use(pacientesRoutes);
app.use(obrassocialesRoutes);



export default app;