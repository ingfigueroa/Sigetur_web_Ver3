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
  const [idPrestacionSelected, setIdPrestacionSelected] = useState("");
  const [idCapituloSelected, setIdCapituloSelected] = useState("");


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
  
    const data = await prestacionesService.BuscarPrestaciones(idCapituloSelected);
    
    setPrestacionCapitulo(data); 


  }

  return (
    <Modal show={show} onHide={handleClose} size="lg"
      style={{width: "100%"}} 
      centered
    >
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#0277bd", color: "white" }}
      >
        <Modal.Title style={{ fontSize: "18px"}}>PRESTACIONES - BUSCAR</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{width: "100%"}}>
      <div className="acomodarencabezadopizaturnos">
           
        
          <InputGroup.Text
                   style={{
                    backgroundColor: "#679bb9",
                    color: "white",
                    height: "28px",
                  }}
              >
                Capitulo:
              </InputGroup.Text>
              <select 
              
               style={{
                backgroundColor: "white",
               
                height: "28px",

              }}
              onChange={(e) =>setIdCapituloSelected(e.target.value)}
              value={idCapituloSelected}
              >
                 <option value="" disabled>Seleccionar</option>
              {TipoCapitulo.map(capitulo => (
                <option key={capitulo.ID} value={capitulo.ID}>
                    {capitulo.Descripcion}
                </option>
            ))}
              </select>
             
        <Button
        size="sm" 
             title="Buscar por capitulo"
              variant="outline-secondary"
              id="button-addon1"
              style={{ height: "28px" }}
              color="white"
              
              onClick={() => Buscar() }
             
            >
              <i class="fa-solid fa-magnifying-glass"></i>
            </Button>
            
            
        </div>


       
        
        <Table bordered hover>
            <thead>
              <tr className="personalizarfila h-50">
              <th style={{ textAlign: "left",backgroundColor: "rgb(136, 161, 184)",
                    color: "white" }} key="1">
                  Código
                </th>
               

                <th style={{ textAlign: "center",backgroundColor: "rgb(136, 161, 184)",
                    color: "white" }} key="2">
                  SubCódigo
                </th>

                <th
                  style={{
                    textAlign: "left",
                    backgroundColor: "rgb(136, 161, 184)",
                    color: "white"
                  
                  }}
                >
                  Prestación
                </th>

               
               
              
                
                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                    color: "white"
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
               
               
             
               <td style={{ textAlign: "center", fontSize:"12px", width:"10%" }}>{Item.codigo}</td>
               <td style={{ textAlign: "center", fontSize:"12px", width:"10%" }}>{Item.SubCodigo}</td>
               <td style={{ textAlign: "left", fontSize:"12px", width:"60%" }}>
                {Item.prestacion}
               </td>
              
               <td style={{ textAlign: "center", fontSize:"12px", width:"20%"}}>
                 
                      <Button
                         variant="outline-success" 
                         size="sm" 
                         /* style={{width:"100%"}} */
                         onClick={() => seleccionarPrestacion(Item.idprestacion)}
             
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
