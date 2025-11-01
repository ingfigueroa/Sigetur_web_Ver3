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

const mdlasignarobrassociales = ({
  show,
  handleClose,
  apellidoynombres,
  id,
  vienede,
  idvienede,
}) => {
  const [Items, setItems] = useState(null);
    const [idusuario, setIDusuario] = useState(2);
  const [Item, setItem] = useState(null);
  const [Pagina, setPagina] = useState(1);
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Paginas, setPaginas] = useState([]);
  const [CantidaddeRegistros, setCantidaddeRegistros] = useState(10);
  const [altaBaja, setAltaBaja] = useState(1);
    const [bandera, setBandera] = useState(1);

 const [showMDLEstaSeguro, setShowMDLEstaSeguro] = useState("");

  const [obraSocial, setObraSocial] = useState([]);
  const [varObraSocial, setVarObraSocial] = useState("");

  const [sigla, setSigla] = useState("");

    const [idObraSocial, setIDObraSocial] = useState("");
    const [selectedOS, setSelectedOS] = useState("");
     const [showMDLMensaje, setShowMDLMensaje] = useState("");
  const [mensaje, setMensaje] = useState("");

    const [mdlMensajeCuerpo, setModalMensajeCuerpo] = useState(
      "¿Está seguro de ASIGNAR esta OBRA SOCIAL al paciente?"
    );
  
    const [mdlMensajeTitulo, setModalMensajeTitulo] = useState(
      "OBRA SOCIAL - ASIGNAR A PACIENTE"
    );
  

  const openMdlMensaje = () => {
    setShowMDLMensaje(true);
  };

  const closeMdlMensaje = () => {
    setShowMDLMensaje(false);
    handleClose();
    
  };

  const openMdlEstaSeguro = (id) => {
    setIDObraSocial(id)
    setShowMDLEstaSeguro(true);
  };

  const closeMdlEstaSeguro = () => {
    setShowMDLEstaSeguro(false);
   
  };

  
  const verificarGrabar = (idobrasocial, par_altabaja) =>{
   
    console.log(idobrasocial)
    if (par_altabaja===0){

      
      setModalMensajeCuerpo("¿Está seguro de DESAFECTAR esta OBRA SOCIAL al paciente?")
      setModalMensajeTitulo("OBRA SOCIAL - DESAFECTAR A PACIENTE")
    }else{
      
       setModalMensajeCuerpo("¿Está seguro de ASIGNAR esta OBRA SOCIAL al paciente?")
      setModalMensajeTitulo("OBRA SOCIAL - ASIGNAR A PACIENTE")
    }
    setAltaBaja(par_altabaja);
    setIDObraSocial(idobrasocial)
      setMensaje("Proceso ejecutado con éxito.");
    
    openMdlEstaSeguro(idobrasocial)
  }

  const mdlSiNo = (respuesta) => {
    if (respuesta) {
      
      
      if (altaBaja === 0){
          setMensaje("Se desafecto la obra social al paciente.")
          DesafectarObraSocialaPaciente()
      }else{
         setMensaje("Se asignó la obra social al paciente.")
          AsignarObraSocialaPaciente()
      }
     
    } else {
      setMensaje("Usuario canceló la operación");
    }
  };


  async function AsignarObraSocialaPaciente() {
   
   
    await obrassocialesService.putAsignarObraSocialPaciente(
      id,
      idObraSocial,
      idusuario
    );

   // setMensaje("Obra social asignada con éxito.");
    setShowMDLMensaje(true);
  //  handleClose();
  }

  
  async function DesafectarObraSocialaPaciente() {
   
    console.log(id)

    console.log(idObraSocial)

    await obrassocialesService.putDesafectarObraSocialPaciente(
      id,
      idObraSocial,
      idusuario
    );

   // setMensaje("Obra social asignada con éxito.");
    setShowMDLMensaje(true);
    //handleClose();
  }


  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }

    const data = await obrassocialesService.Buscar(
      varObraSocial,
      sigla,
      bandera,
      _pagina,
      CantidaddeRegistros
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

  async function BuscarObraSocial(id) {
    try {
      let data;
      if (idvienede === "0") {
        
        data = await obrassocialesService.BuscarPorPaciente(id);

        
      }

      setObraSocial(data);
      // Establece el estado con los datos obtenidos
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // 👉 este solo busca datos del backend
  /*   useEffect(() => {
    Buscar();
  }, [fechainicio, fechafinal, Pagina, CantidaddeRegistros]); */

  useEffect(() => {
    
    BuscarObraSocial(id);
  }, []);

  useEffect(() => {
    console.log(RegistrosTotal);
  }, [RegistrosTotal]);

 

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#9ba4aaff", color: "white" }}
        >
          <Modal.Title>ASIGNAR UNA OBRA SOCIAL</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ width: "100%", fontSize: "15px" }}>
          <div>
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                {vienede}
              </InputGroup.Text>
              <Form.Control
                value={apellidoynombres}
                aria-label="First name"
                style={{ backgroundColor: "#d5dbdb", color: "black" }}
              />
            </InputGroup>
            <InputGroup className="mb-3" size="sm">
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                OBRAS SOCIALES ACTIVAS:
              </InputGroup.Text>
              <select
                style={{ width: "40%" }}
                onChange={(e) => setSelectedOS(e.target.value)}
                //value={fecha}
              >
                    {obraSocial.map(os => (
                  <option key={os.id} value={os.id}>
                    {os.Descripcion}
                  </option>
                ))}
              </select>
              <button
                        title="Eliminar OBRA SOCIAL del paciente"
                       className="btn btn-sm btn-light btn-danger"
                        onClick={() => verificarGrabar(selectedOS, 0)}
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>
            </InputGroup>
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
                onChange={(e) => setVarObraSocial(e.target.value.toUpperCase())}
                value={varObraSocial}
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
                              style={{ height: "38px"}}
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
                              variant="success"
                              size="sm"
                              style={{ width: "50%" }}
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

export default mdlasignarobrassociales;
