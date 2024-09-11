import React, {useState, useEffect} from "react";

import Table from "react-bootstrap/Table";

import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from 'react-bootstrap/Modal';

import { profesionalesService } from "/src/services/profesional.service";
import { prestacionesService } from "/src/services/prestaciones.service.js";


import "/src/css/sigetur.css";
import "/src/css/pizarradeturnos.css";

const mdllistarprestaciones = ({ show, handleClose, enviarAlPadre, idprofesion }) => {

  const [items, setItems] = useState(null);
  const [TipoCapitulo, setTipoCapitulo] = useState([]);
  const [PrestacionCapitulo, setPrestacionCapitulo] = useState([]);
  const [idPrestacionSelected, setIdPrestacionSelected] = useState('');


  const seleccionarPrestacion = (idPrestacion) => {
    enviarAlPadre(idPrestacion);
    handleClose() // Envía el id al componente padre
  };
    /*Carga Tipo de profesiones*/
    useEffect(() => {
      async function fetchData() {
          try {
              const data = await prestacionesService.BuscarCapitulos(idprofesion); // Llama a la función asíncrona
              setTipoCapitulo(data); // Establece el estado con los datos obtenidos
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      }

      fetchData(); // Ejecuta la función para obtener los datos
  }, []); 

  
  async function Buscar() {
  
    const data = await prestacionesService.BuscarPrestaciones(idPrestacionSelected);
    setPrestacionCapitulo(data); 

  }

  return (
    <Modal show={show} onHide={handleClose} size="xl"
      style={{width: "100%"}}
    >
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#0277bd", color: "white" }}
      >
        <Modal.Title>Buscar profesionales</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{width: "100%"}}>
      <div className="acomodarencabezadopizaturnos">
           
        
          <InputGroup.Text
                   style={{
                    backgroundColor: "#679bb9",
                    color: "white",
                    height: "38px",
                  }}
              >
                Prestación:
              </InputGroup.Text>
              <select 
               style={{
                backgroundColor: "white",
               
                height: "38px",
              }}
              onChange={(e) =>setIdPrestacionSelected(e.target.value)}
              value={idPrestacionSelected}
              >
                 <option value="" disabled>Seleccionar</option>
              {TipoCapitulo.map(capitulo => (
                <option key={capitulo.id} value={capitulo.id}>
                    {capitulo.descripcion}
                </option>
            ))}
              </select>
             
        <Button
             title="Buscar por capitulo"
              variant="outline-secondary"
              id="button-addon1"
              style={{ height: "38px" }}
              color="white"
              
              onClick={() => Buscar() }
             
            >
              <i class="fa-solid fa-magnifying-glass"></i>
            </Button>
            
        </div>
       
        
        <Table bordered hover>
            <thead>
              <tr className="personalizarfila h-50">
            
                <th
                  style={{
                    textAlign: "left",
                    backgroundColor: "rgb(136, 161, 184)",
                  
                  }}
                >
                  Prestación
                </th>

                <th style={{ textAlign: "left",backgroundColor: "rgb(136, 161, 184)" }} key="1">
                  Código
                </th>
               

                <th style={{ textAlign: "center",backgroundColor: "rgb(136, 161, 184)" }} key="2">
                  SubCódigo
                </th>

               
              
                
                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                  key="8"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
            {PrestacionCapitulo &&
            PrestacionCapitulo.map((Item) => (
              <tr key={Item.ID}>
               
               
               <td style={{ textAlign: "left", fontSize:"12px" }}>
                {Item.descripcion}
               </td>
               <td style={{ textAlign: "left", fontSize:"12px" }}>{Item.codigo}</td>
               <td style={{ textAlign: "center", fontSize:"12px" }}>{Item.subcodigo}</td>
             
              
               <td style={{ textAlign: "center", fontSize:"12px"}}>
                 
                      <Button
                         variant="outline-success" 
                         size="sm" 
                         style={{width:"70%"}}
                         onClick={() => seleccionarPrestacion(Item.ID)}
             
                         >
                        Seleccionar
                      </Button>
                     
                  </td>
                  
                </tr>
                //<TableRow item={item} />
              ))}
            </tbody>
          </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default mdllistarprestaciones;
