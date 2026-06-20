import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from './components/Home'


import Login from "./components/login/Login";
import Registrarconsultorio from "./components/registrocliente/Registrarconsultorio";
import Sigetur from "./components/sigetur";

import RegistrarClientePasoDos from "./components/registrocliente/registrarclientepasodos";
import RegistrarClientePasoTres from "./components/registrocliente/registrarclientepasotres";
import EmailResetPassword from "./components/login/ingresarEmailResetPassword"
import ResetPassword from "./components/login/resetpassword"
import PrivateRoute from "./components/login/PrivateRoute";


function App() {
  return (
    <BrowserRouter>
      
      <Routes>

        <Route path="/sigetur"
          element={
            <PrivateRoute>
              <Sigetur />
            </PrivateRoute>
          }
        />
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/crearcuentapasouno' element={<Registrarconsultorio />}/>
       {/*  <Route path='/sigetur' element={<Sigetur />}/> */}
   
        <Route path="/crearcuentapasodos" element={<RegistrarClientePasoDos />} />

        <Route path="/registrarconsultorio" element={<RegistrarClientePasoTres />} />

        <Route path="/emailresetpassword" element={<EmailResetPassword />} />

         <Route path="/resetpassword" element={<ResetPassword />} />
       

      </Routes>
     
    </BrowserRouter>
  );
}

export default App;
