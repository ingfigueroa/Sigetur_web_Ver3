import React, { useState, useEffect } from "react";


import Table from "react-bootstrap/Table";

import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import "/src/css/sigetur.css";


import { profesionalesService } from "/src/services/profesional.service";
import mdlAltaProfesionales from "./registrarprofesional";


import modalDialogService from "/src/services/modalDialog.service";


 function Profesionales() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Apellido, SetApellido]  = useState(null);

  const [VarDNI, SetDNI]  = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  
 const [mdlRegistrarProfesional, setModalRegistrarProfesional] = useState(false)

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  const [mdlListaEspera, setModalListaEspera] = useState(false);

  const closeMdlListaEspera = () => {
    setModalListaEspera(false);
  };

  const openMdlListaEspera = () => {
    setModalListaEspera(true);
  };

  const openMdlHoraProfe = () => {
    setModalHoraProfe(true);
  };

  const closeMdlHoraProfe = () => {
    setModalHoraProfe(false);
  };

  const openMdlRegistrarProfe = () => {
    setModalRegistrarProfesional(true);
  };

  
  const closeMdlRegistrarProfe = () => {
    setModalRegistrarProfesional(false);
  };

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }
    modalDialogService.BloquearPantalla(true);
    const data = await profesionalesService.Buscar(Apellido, VarDNI);
    modalDialogService.BloquearPantalla(false);
    
    setItems(data);
    
    setRegistrosTotal(data.length);

    //generar array de las páginas para mostrar en select del paginador
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.length / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }




  async function BuscarPorId(item, accionABMC) {
    const data = await profesionalesService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }
  

  function Consultar(item) {
    BuscarPorId(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(item) {
    if (!item.Activo) {
      //alert("No puede modificarse un registro Inactivo.");
      modalDialogService.Alert("No puede modificarse un registro Inactivo.");
      return;
    }
    BuscarPorId(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  async function Agregar() {
    setAccionABMC("A");
    setItem({
        IdArticulo: 0,
        Nombre: '',
        Precio: '',
        Stock: '',
        CodigoDeBarra: '',
        IdArticuloFamilia: '',
        FechaAlta: moment(new Date()).format("YYYY-MM-DD"),
        Activo: true,
      });
    //modalDialogService.Alert("preparando el Alta...");
  }

  function Imprimir() {
    modalDialogService.Alert("En desarrollo...");
  }

  async function ActivarDesactivar(item) {
    modalDialogService.Confirm(
      "Esta seguro que quiere " +
        (item.Activo ? "desactivar" : "activar") +
        " el registro?",
      undefined,
      undefined,
      undefined,
      async () => {
        await profesionalesService.ActivarDesactivar(item);
        await Buscar();
      }
    );

  }
  
  

  async function Grabar(item) {
    // agregar o modificar
    try
    {
      await profesionalesService.Grabar(item);
    }
    catch (error)
    {
      modalDialogService.Alert(error?.response?.data?.message ?? error.toString())
      return;
    }
    await Buscar();
    Volver();
  
    //setTimeout(() => {
      modalDialogService.Alert(
        "Registro " +
          (AccionABMC === "A" ? "agregado" : "modificado") +
          " correctamente."
      );
    //}, 0);
  }
  

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
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
       <div className="acomodarencabezadopizaturnos">
          
          <div className="tituloPagina">
       Profesionales <small>{TituloAccionABMC[AccionABMC]}</small>
      
            
          </div>
          
          <div style={{ width: "30%", textAlign: "right" }}>
          <button
              title="Registrar nuevo profesional"
              className="btn btn-sm btn-light btn-outline-primary"
              onClick={openMdlRegistrarProfe}
            >
              <i class="fa-solid fa-plus"></i>
            </button>
           
            
          </div>
          
        </div>
        <hr />

      
        <div className="acomodarencabezadopizaturnos">
          
          <InputGroup className="mb-3">
            <InputGroup.Text
              style={{
                backgroundColor: "#679bb9",
                color: "white",
                height: "38px",
              }}
            >
              Profesional
            </InputGroup.Text>
            <Form.Control
              placeholder="Buscar por apellido de profesional"
              aria-label="Buscar profesional"
              aria-describedby="basic-addon2"
              onChange={(e) => SetApellido(e.target.value)}
              value={Apellido}
              autoFocus
            />
            
            <Button
              title="Buscar por profesional"
             
              variant="outline-secondary"
              id="button-addon1"
              style={{ height: "38px" }}
              color="white"
              
              onClick={() => Buscar(1) }
              
             
            >
               
              <i class="fa-solid fa-magnifying-glass"></i>
            </Button>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text
              style={{
                backgroundColor: "#679bb9",
                color: "white",
                height: "38px",
              }}
            >
              DNI
            </InputGroup.Text>
            <Form.Control
              placeholder="Buscar por DNI"
              aria-label="Profesión"
              aria-describedby="basic-addon2"
              style={{ marginght: "20px" }}
              onChange={(e) => SetDNI(e.target.value)}
              value= {VarDNI}
            />
            <Button
             title="Buscar por DNI"
              variant="outline-secondary"
              id="button-addon1"
              style={{ height: "38px" }}
              color="white"
              onClick={() => Buscar(1) }
             
            >
              <i class="fa-solid fa-magnifying-glass"></i>
            </Button>
          </InputGroup>
        </div>
        <hr />
        
    </form>

      
     
       
      <div className="">
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
                  Apellido
                </th>

                <th style={{ textAlign: "center",backgroundColor: "rgb(136, 161, 184)" }} key="1">
                  Nombres
                </th>

                <th style={{ textAlign: "center",backgroundColor: "rgb(136, 161, 184)" }} key="2">
                  Especialidad
                </th>
                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                  key="3"
                >
                  DNI
                </th>

                <th style={{ textAlign: "center",backgroundColor: "rgb(136, 161, 184)" }} key="4">
                 EMail
                </th>
                <th style={{ textAlign: "center",backgroundColor: "rgb(136, 161, 184)" }} key="5">
                 Estado
                </th>

                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                  key="6"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
            {Items &&
            Items.map((Item) => (
              <tr key={Item.ID}>
               
                <td style={{ textAlign: "center" }}>
                {Item.ID}
               </td>
               <td style={{ textAlign: "center", fontSize:"12px" }}>
                {Item.Apellido}
               </td>
               <td style={{ textAlign: "center", fontSize:"12px" }}>{Item.Nombres}</td>
               <td style={{ textAlign: "center", fontSize:"12px" }}>{Item.Idtipoprofesion}</td>
               <td style={{ textAlign: "center", fontSize:"12px" }}>{Item.NroDocumento}</td>
               <td style={{ textAlign: "center", fontSize:"12px" }}>{Item.EMail}</td>
               <td style={{ textAlign: "center", fontSize:"12px"}}>
               {Item.IDEstado === 1 ? (
                      <Button variant="success" size="sm" style={{width:"70%"}}>
                        activo
                      </Button>
                    ) : (
                      <Button variant="danger" size="sm" style={{width:"70%"}}>
                        pasivo
                      </Button>
                      
                    )
                     }
                  </td>
                  <td style={{ textAlign: "center" }}>
                  <button
                      title="Editar profesional"
                      className="btn btn-sm btn-light btn-danger"
                      onClick={openMdlListaEspera}
                    >
                      
                      <i class="fa-solid fa-user-pen"></i>
                    </button>
                    <button
                      title="Horarios profesional"
                      className="btn btn-sm btn-light btn-primary"
                      onClick={openMdlHoraProfe}
                    >
                      <i class="fa-solid fa-clock"></i>
                    </button>
                    <button
                      title="Lista de espera"
                      className="btn btn-sm btn-light btn-danger"
                      onClick={openMdlListaEspera}
                    >
                      <i class="fa-solid fa-book-open-reader"></i>
                      
                    </button>
                    <button
                       title="Agenda Semanal"
                       className="btn btn-sm btn-light btn-danger"
                    >
                    <i class="fa-solid fa-calendar-days"></i>
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
            <button className="btn btn-primary float-end" onClick={() => Imprimir()}>
              <i className="fa fa-print"></i>Imprimir
            </button>
          </div>
        </div>
      </div>   
      
    </div>
    
    { mdlRegistrarProfesional && (
        <mdlAltaProfesionales
          show={openMdlRegistrarProfe}
          handleClose={closeMdlRegistrarProfe}
        />
      )}

    </>

  ); 

}


export default Profesionales;
