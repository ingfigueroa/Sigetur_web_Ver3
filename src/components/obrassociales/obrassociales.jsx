import React, { useState, useEffect } from "react";

import Table from "react-bootstrap/Table";

import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import "/src/css/sigetur.css";

import { obrassocialesService } from "/src/services/obrassociales.service";



import ActivarObraSocial from "../obrassociales/activarobrasocial";

function ObrasSociales() { 



  const [Descripcion, SetDescripcion] = useState("");
    const [sigla, setSigla] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [bandera, setBandera] = useState(1);

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [CantidaddeRegistros, setCantidaddeRegistros] = useState(10);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

   const [showMDLActivarObraSocial, setShowMDLActivarObraSocial] = useState("");

    
  const openMdlActivar = () => {

    setShowMDLActivarObraSocial(true);
  };

  const closeMdlActivar = () => {
    setShowMDLActivarObraSocial(false);
   
  };

  useEffect(() => {
    document.title = "Si.Ge.Tur. - Obras Sociales";
  }, []);

  async function Buscar(_pagina, cantidad = CantidaddeRegistros) {
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
    for (let i = 1; i <= Math.ceil(data.total / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }


  

  async function Limpiar() {
    SetDescripcion("");
    setSigla("");
    setRegistrosTotal(0);
    setPaginas([]);
    setItems([]);
  }



  return (
    <>
      <div
        style={{
          display: "grid",
          width: "100%",
          margin: "15px 15px",
          backgroundColor: "white",
        }}
      >
        <form>
         <div style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",

          }}
          >
           

            <div  style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "5px",
              backgroundColor: "white",
              marginBottom: "5px",
              padding: "5px",
            }}>
              <button
                title="ACTIVAR nueva obra social en el CONSULTORIO"
                className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
                onClick={(event) => {
                  event.preventDefault();
                  openMdlActivar();
                }}
              >
                <i class="fa-solid fa-plus"></i>
              </button>
               <button
                title="Imprimir"
                className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
                style={{ display: "none" }}
                onClick={() => Imprimir()}
              >
                <i class="fa fa-print"></i>
              </button>
               <Button
title="Buscar por obra social"
                
                
                
                color="white"
              variant="success"
              className="btn"
              size="sm"
                            style={{
                              marginLeft: "auto",
                             
                              width: "10%",
                              textAlign: "center",
                              
                              
                            }}
                            
                           
                           onClick={() => Buscar(1)}
                          >
                           <i class="fa-solid fa-magnifying-glass"></i> TURNOS
                          </Button>
                           <Button
                            title="Limpiar parámetros"
                            variant="primary"
                            className="btn "
                            size="sm"
                            style={{
                              
                              
                              textAlign: "center",
                             
                            }}
                            onClick={(event) => {
                              
                              event.preventDefault();
                              Limpiar();

                            }}
                          >
                            <i className="fa-solid fa-broom"></i>
                          </Button> 
            </div>
          </div>
          <hr />

          <div className="acomodarencabezadopizaturnos">
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{
                 backgroundColor: "#4b959b",
                  color: "white",
                  height: "38px",
                }}
              >
                Obra Social
              </InputGroup.Text>
              <Form.Control
                placeholder="Filtrar por nombre de las obras sociales"
                aria-label="Buscar obras social"
                aria-describedby="basic-addon2"
                onChange={(e) => 
                 
                  SetDescripcion(e.target.value.toUpperCase())}
                value={Descripcion}
                autoFocus
              />
             
               <InputGroup.Text
                style={{
                backgroundColor: "#4b959b",
                  color: "white",
                  height: "38px",
                }}
              >
                Sigla
              </InputGroup.Text>
              <Form.Control
                placeholder="Buscar por sigla de la obra social"
                aria-label="Buscar obras social"
                aria-describedby="basic-addon2"
                onChange={(e) => 
                  
                  setSigla(e.target.value.toUpperCase())}
                value={sigla}
                autoFocus
              />
             
            </InputGroup>
          </div>
         
        </form>

        <div className="">
         
            <InputGroup  >
              <InputGroup.Text
                style={{
                 backgroundColor: "white",
                  color: "black",
                  height: "38px",
                  width: "20%",
                  textAlign: "center"
                }}
              >
                Obra sociales ACTIVAS
              </InputGroup.Text>
             
             

            </InputGroup>
         
          <Table bordered hover>
            <thead>
              <tr className="personalizarfila h-50">
                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                >
                  ID
                </th>
                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                >
                  Obra Social
                </th>
                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                >
                  Sigla
                </th>

                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                >
                  EMail
                </th>

                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                  key="4"
                >
                  Estado
                </th>

                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {Items &&
                Items.map((Item) => (
                  <tr key={Item.ID}>
                    <td style={{ textAlign: "center" }}>{Item.ID}</td>
                    <td
                      style={{
                        textAlign: "left",
                        fontSize: "12px",
                        width: "30%",
                      }}
                    >
                      {Item.observacion}
                    </td>
                    <td style={{ textAlign: "center", fontSize: "12px" }}>
                      {Item.descripcion}
                    </td>

                    <td style={{ textAlign: "center", fontSize: "12px" }}>
                      {Item.email}
                    </td>

                    <td style={{ textAlign: "center", fontSize: "12px" }}>
                      {Item.IDEstado === 1 ? (
                        <Button
                          variant="success"
                          size="sm"
                          style={{ width: "70%" }}
                        >
                          activo
                        </Button>
                      ) : (
                        <Button
                          variant="danger"
                          size="sm"
                          style={{ width: "70%" }}
                        >
                          pasivo
                        </Button>
                      )}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        title="Editar obra social"
                        className="btn btn-sm btn-light btn-danger"
                      >
                        <i class="fa-solid fa-user-pen"></i>
                      </button>
                    </td>
                  </tr>
                  //<TableRow item={item} />
                ))}
            </tbody>
          </Table>
        </div>
        {/* Paginación */}
          <div className="paginador">
          <div className="row">
            <div className="col">
              <span className="pyBadge">Registros: {RegistrosTotal}</span>
            </div>
            <div className="col text-center">
              Pagina: &nbsp;
              <select
                value={Pagina}
                onChange={(e) => {
                  Buscar(e.target.value);
                }}
              >
                {Paginas?.map((x) => (
                  <option value={x} key={x}>
                    {x}
                  </option>
                ))}
              </select>
              &nbsp; de {Paginas?.length}
            </div>

            <div className="col">
              Mostrar de a: &nbsp;
              <select
                value={CantidaddeRegistros}
                onChange={(e) => {
                  setCantidaddeRegistros(e.target.value);
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
      </div>
      
                   {showMDLActivarObraSocial && (
                          <ActivarObraSocial
                            show={openMdlActivar}
                            handleClose={closeMdlActivar}
                           
                          />
                        )}
    </>
  );
}

export default ObrasSociales;
