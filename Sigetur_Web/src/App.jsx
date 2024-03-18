import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from './components/Home'


import Login from "./components/Login";
import Registrarconsultorio from "./components/Registrarconsultorio";
import Pizarradeturnos from "./components/pizarradeturnos";

function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path='' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/Registrarconsultorio' element={<Registrarconsultorio />}/>
        <Route path='/pizarradeturnos' element={<Pizarradeturnos />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
