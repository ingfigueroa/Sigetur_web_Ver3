import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from './components/Home'


import Login from "./components/Login";
import Registrarconsultorio from "./components/Registrarconsultorio";
import Sigetur from "./components/sigetur";

import RegistrarClientePasoDos from "./components/registrocliente/registrarclientepasodos";
import RegistrarClientePasoTres from "./components/registrocliente/registrarclientepasotres";



function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path='' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/crearcuentapasouno' element={<Registrarconsultorio />}/>
        <Route path='/sigetur' element={<Sigetur />}/>
   
        <Route path="/crearcuentapasodos" element={<RegistrarClientePasoDos />} />

        <Route path="/registrarconsultorio" element={<RegistrarClientePasoTres />} />
       

      </Routes>
     
    </BrowserRouter>
  );
}

export default App;
