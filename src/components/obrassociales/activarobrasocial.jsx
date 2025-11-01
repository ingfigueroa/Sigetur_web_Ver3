import React, { useState, useEffect, useRef } from "react";


import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Button } from "react-bootstrap";


import "/src/css/pizarradeturnos.css";
import "/src/css/tablapizaturnos.css";

import ButtonGroup from "react-bootstrap/ButtonGroup";

import MDLEstaSeguro from "../modales/mdlEstaSeguro";
import AbrirMDLMensaje from "../modales/MdlMensaje";

import { obrassocialesService } from "/src/services/obrassociales.service";

const mdlactivarobrasocial = ({
  show,
  handleClose,
  idusuario
}) => {
  const [Items, setItems] = useState(null);
    
  const [Item, setItem] = useState(null);

  const [bandera, setBandera] = useState(0);

  const [Pagina, setPagina] = useState(1);
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Paginas, setPaginas] = useState([]);
  const [CantidaddeRegistros, setCantidaddeRegistros] = useState(10);
  
 const [sigla, setSigla] = useState("");
 const [showMDLEstaSeguro, setShowMDLEstaSeguro] = useState("");

 const [Descripcion, SetDescripcion] = useState("");
  const [obraSocial, setObraSocial] = useState([]);
  const [varObraSocial, setVarObraSocial] = useState("");
    const [idObraSocial, setIDObraSocial] = useState("");
    const [selectedOS, setSelectedOS] = useState("");
     const [showMDLMensaje, setShowMDLMensaje] = useState("");
  const [mensaje, setMensaje] = useState("");



    const [mdlMensajeCuerpo, setModalMensajeCuerpo] = useState(
      "¿Está seguro de ACTIVAR esta OBRA SOCIAL en la clínica o consultorio?"
    );
  
    const [mdlMensajeTitulo, setModalMensajeTitulo] = useState(
      "OBRA SOCIAL - ACTIVAR EN LA CLINICA O CONSULTORIO"
    );
  

  const openMdlMensaje = () => {
    setShowMDLMensaje(true);
  };
  
const closeMdlMensaje = () => {
  setShowMDLMensaje(false);
  handleClose();
  setTimeout(() => Buscar(1), 300); // espera 300 ms
};



  const openMdlEstaSeguro = (id) => {
    setIDObraSocial(id)
    setShowMDLEstaSeguro(true);
  };

  const closeMdlEstaSeguro = () => {
    setShowMDLEstaSeguro(false);
   
  };

 

  
  const mdlSiNo = (respuesta) => {
    if (respuesta) {
      
      
    
          setMensaje("Se ACTIVO la obra social a la CLINICA o CONSULTORIO.")
          ActivarObraSocial(idObraSocial)
          
     
    } else {
      setMensaje("Usuario canceló la operación");
    }
  };


  async function ActivarObraSocial() {
   
   
    await obrassocialesService.putActivarObraSocial(
      
      idObraSocial
    );

   // setMensaje("Obra social asignada con éxito.");
    setShowMDLMensaje(true);
  //  handleClose();
  }



  async function Buscar(_pagina, cantidad = CantidaddeRegistros) {
    console.log("Llega?")
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }
  
    const data = await obrassocialesService.Buscar(
      Descripcion,
      sigla,
      bandera,
      _pagina,
      cantidad
    );

    setItems(data.registros);
    setRegistrosTotal(data.total);

    //generar array de las páginas para mostrar en select del paginador
    const arrPaginas = [];

    for (let i = 1; i <= Math.ceil(data.total / CantidaddeRegistros); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }
/* 
useEffect(() => {
  if (!showMDLEstaSeguro) {
    Buscar(1);
  }
}, [showMDLEstaSeguro]); */


  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#9ba4aaff", color: "white" }}
        >
          <Modal.Title>ACTIVAR UNA OBRA SOCIAL EN LA CLINICA O CONSULTORIO</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ width: "100%", fontSize: "15px" }}>
          <div>
            
            
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{
                  backgroundColor: "#679bb9",
                  color: "white",
                  height: "38px",
                }}
              >
                Obras sociales - Buscar
              </InputGroup.Text>
              <Form.Control
                placeholder="Filtrar obras sociales"
                aria-label="Filtrar obras sociales"
                aria-describedby="basic-addon2"
                type="text"
                onChange={(e) => 
                 
                  SetDescripcion(e.target.value.toUpperCase())}
                value={Descripcion}
                autoFocus
              />

              <Button
                title="Buscar obras sociales"
                variant="outline-secondary"
                id="button-addon1"
                style={{ height: "38px" }}
                color="white"
                onClick={() => Buscar(1)}
              >
                <i class="fa-solid fa-magnifying-glass"></i>
              </Button>
              <InputGroup.Text
                style={{
                  backgroundColor: "#679bb9",
                  color: "white",
                  height: "38px",
                }}
              >
                Sigla
              </InputGroup.Text>
              <Form.Control
                placeholder="Buscar por nombre de las obras sociales"
                aria-label="Buscar obras social"
                aria-describedby="basic-addon2"
                onChange={(e) => 
                  
                  setSigla(e.target.value.toUpperCase())}
                value={sigla}
                autoFocus
              />
              <Button
                title="Buscar por obra social"
                variant="outline-secondary"
                id="button-addon1"
                style={{ height: "38px" }}
                color="white"
                onClick={() => Buscar(1)}
              >
                <i class="fa-solid fa-magnifying-glass"></i>
              </Button>
            </InputGroup>
            

            <div className="acomodartabla">
              <Table
                bordered
                hover
                style={{ width: "100%", textAlign: "center" }}
              >
                <thead style={{ fontSize: "14px", backgroundColor: "white" }}>
                  <tr className="personalizarfila h-50">
                    <th style={{ textAlign: "center", width: "10%" }}>ID</th>
                    <th style={{ textAlign: "center", width: "30%" }}>OBRA SOCIAL</th>
                    <th style={{ textAlign: "center", width: "20%" }}>SIGLA</th>
                    <th style={{ textAlign: "center", width: "20%" }}>ESTADO</th>

                    <th style={{ textAlign: "center", width: "20%" }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {Items &&
                    Items.map((item) => {
                      return (
                        <tr key={item.ID}>
                          <td style={{ textAlign: "center", fontSize: "14px" }}>
                            {item.ID}
                          </td>
                          <td style={{ textAlign: "center", fontSize: "14px" }}>
                            {item.observacion}
                          </td>
                          <td style={{ textAlign: "center", fontSize: "14px" }}>
                            {item.descripcion}
                          </td>
                           <td style={{ textAlign: "center", fontSize: "14px" }}>
                            <Button
                              variant="danger"
                              size="sm"
                              style={{ width: "70%" }}
                             //onClick={() => verificarGrabar(item.ID, 1)}

                              
                            >
                              Sin usar
                            </Button>
                          </td>

                          <td style={{ textAlign: "center", fontSize: "14px" }}>
                            <Button
                              variant="success"
                              size="sm"
                              style={{ width: "70%" }}
                              onClick={() => openMdlEstaSeguro(item.ID)}

                              
                            >
                              Activar
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>
            <div className="paginador">
              <div className="row">
                <div className="col">
                  <span className="pyBadge">Registros: {RegistrosTotal}</span>
                </div>

                <div className="col text-center">
                  Página: &nbsp;
                  <select
                    value={Pagina}
                    onChange={(e) => Buscar(Number(e.target.value))}
                  >
                    {Paginas?.map((x) => (
                      <option value={x} key={x}>
                        {x}
                      </option>
                    ))}
                  </select>
                  &nbsp; de {Paginas?.length}
                </div>

                <div className="col text-end">
                  Mostrar de a: &nbsp;
                  <select
                    value={CantidaddeRegistros}
                    onChange={(e) => {
                      setCantidaddeRegistros(Number(e.target.value));
                      setPagina(1); // resetear a la primera página
                    }}
                  >
                    {[10, 15, 20, 25].map((x) => (
                      <option value={x} key={x}>
                        {x}
                      </option>
                    ))}
                  </select>
                  &nbsp; registros.
                </div>
              </div>
            </div>

            <span
              style={{
                display: "block",
                height: "4px",
                backgroundColor: "gray",
                margin: "10px 0",
                width: "100%",
              }}
            ></span>
          </div>
            <div
                        style={{
                          width: "100%",
                          margin: "0 auto",
                          backgroundColor: "white",
                          textAlign: "right",
                        }}
                      >
                        <ButtonGroup className="mb-2">
                        
                          <Button variant="primary" onClick={handleClose}>
                            Cerrar
                          </Button>
                        </ButtonGroup>
                      </div>
        </Modal.Body>
      </Modal>
      
            {showMDLEstaSeguro && (
              <MDLEstaSeguro
                show={openMdlEstaSeguro}
                handleClose={closeMdlEstaSeguro}
                mensajetitulo={mdlMensajeTitulo}
                mensajecuerpo={mdlMensajeCuerpo}
                enviaralpadre={mdlSiNo}
              />
            )}

             {showMDLMensaje && (
                    <AbrirMDLMensaje
                      show={openMdlMensaje}
                      handleClose={closeMdlMensaje}
                      modalMessage={mensaje}
                    />
                  )}
    </>
  );
};

export default mdlactivarobrasocial;
