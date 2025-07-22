import React, { useState, useEffect } from "react";


import Table from "react-bootstrap/Table";

import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import "/src/css/sigetur.css";
import "/src/css/pizarradeturnos.css";

import MdlAltaPaciente from "./registrarpaciente";

import { pacientesService } from "/src/services/pacientes.service";

import MdlEditarPacientes from "./modificarpacientes";

import MdlultimosTurnos from "../pacientes/mdlpacienteultimosturnos";

import modalDialogService from "/src/services/modalDialog.service";


function Pacientes() {
  const [Apellido, SetApellido]  = useState(null);

  const [VarDNI, SetDNI]  = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  
 const [mdlRegistrarPaciente, setModalRegistrarPaciente] = useState(false)
 const [mdlEditarPaciente, setMdlEditarPaciente] = useState(false);
 const [idPaciente, setIDPaciente] = useState(false);
  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);
  const [apeyNom, setapeyNom] = useState(null);
      const [CantidaddeRegistros, setCantidaddeRegistros] = useState(10);
  const [mdlUltimosTurnos, setModalUltimosTurnos] = useState(false);

useEffect(() => {
  document.title = "Si.Ge.Tur. - Pacientes";
}, []);


  const openMdlUltimosTurnos = (item) => {
    
    setIDPaciente(item.ID);
    const apyNom = `${item.Apellido || ""}, ${item.Nombres || ""}`; // Concatenar manejando valores nulos
    setapeyNom(apyNom.trim()); // Eliminar espacios en blanco innecesarios
    setModalUltimosTurnos(true);
  };


  const closeMdlUltimosTurnos = () => {
    setModalUltimosTurnos(false);
  };

  const openMdlRegistrarPaciente = () => {
    setModalRegistrarPaciente(true);
  };

  
  const closeMdlRegistrarPaciente = () => {
    setModalRegistrarPaciente(false);
  };


  
  const openMdlEditarPaciente = (item) => {
    setIDPaciente(item.ID)
    setMdlEditarPaciente(true);
  };

  const closeMdlEditarPaciente = () => {
    setMdlEditarPaciente(false);
    Buscar(1)
    
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
    const data = await pacientesService.Buscar(Apellido, VarDNI, _pagina, CantidaddeRegistros);
     setItems(data.registros);
    
    setRegistrosTotal(data.total);

    //generar array de las páginas para mostrar en select del paginador
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.total / CantidaddeRegistros); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
    modalDialogService.BloquearPantalla(false);
    
   
  }


  async function BuscarPorId(item, accionABMC) {
    const data = await pacientesService.BuscarPorId(item);
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
        await pacientesService.ActivarDesactivar(item);
        await Buscar();
      }
    );

  }
  
  
  async function Limpiar(params) {
    SetApellido("")
    SetDNI("")
    setItems([])
}

  async function Grabar(item) {
    // agregar o modificar
    try
    {
      await pacientesService.Grabar(item);
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
          
      
          <div style={{ width: "30%", textAlign: "left" }}>
          <button
              title="Registrar nuevo paciente"
              className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
              onClick={(event) => {
                event.preventDefault();
                openMdlRegistrarPaciente();
              }}
            >
              <i class="fa-solid fa-plus"></i>
            </button>
            <button 
               title="Imprimir"
              className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
              onClick={() => Imprimir()}>
              <i class="fa fa-print"></i>
            </button>
            
           

            
          </div>
          
        </div>
     

      
        <div className="acomodarencabezadopizaturnos">
          
          <InputGroup className="mb-3">
            <InputGroup.Text
              style={{
                backgroundColor: "#679bb9",
                color: "white",
                height: "38px",
              }}
            >
              Paciente
            </InputGroup.Text>
            <Form.Control
              placeholder="Buscar por apellido de paciente"
              aria-label="Buscar paciente"
              aria-describedby="basic-addon2"
              onChange={(e) => SetApellido(e.target.value.toUpperCase())}
              value={Apellido}
              autoFocus
            />
            <Button
              title="Buscar por paciente"
             
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
              value={VarDNI}
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
              <Button variant="success" onClick={() => Limpiar()}>
                  Limpiar
              </Button>
          </InputGroup>
        </div>
        
        
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
                    textAlign: "left",
                    backgroundColor: "rgb(136, 161, 184)",
                  
                  }}
                >
                  Apellido
                </th>

                <th style={{ textAlign: "left",backgroundColor: "rgb(136, 161, 184)" }} >
                  Nombres
                </th>

                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                  
                >
                  DNI
                </th>

                <th style={{ textAlign: "center",backgroundColor: "rgb(136, 161, 184)", width:"15%"}} >
                 EMail
                </th>
                <th style={{ textAlign: "center",backgroundColor: "rgb(136, 161, 184)", width:"15%"}} >
                 Celular
                </th>
                <th style={{ textAlign: "center",backgroundColor: "rgb(136, 161, 184)" }}>
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
               
                <td style={{ textAlign: "center" }}>
                {Item.ID}
               </td>
               <td style={{ textAlign: "left", fontSize:"12px" }}>
                {Item.Apellido}
               </td>
               <td style={{ textAlign: "left", fontSize:"12px" }}>{Item.Nombres}</td>
              
               <td style={{ textAlign: "center", fontSize:"12px" }}>{Item.NroDocumento}</td>
               <td style={{ textAlign: "center", fontSize:"12px" }}>{Item.EMail}</td>
               <td style={{ textAlign: "center", fontSize:"12px" }}>{Item.TECelular}</td>
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
                      title="Editar paciente"
                      className="btn btn-sm btn-light btn-danger"
                      onClick={() => openMdlEditarPaciente(Item)}
                    >
                      
                      <i class="fa-solid fa-user-pen"></i>
                    </button>
                  
                    <button
                       title="Listar turnos pedidos"
                       className="btn btn-sm btn-light btn-danger"
                       onClick={() => openMdlUltimosTurnos(Item)}
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
           {/* Paginador*/}
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
    
    { mdlRegistrarPaciente && (
        <MdlAltaPaciente

          show={openMdlRegistrarPaciente}
          handleClose={closeMdlRegistrarPaciente}
        />
      
      )}
    

    {mdlEditarPaciente && (
        <MdlEditarPacientes
          show={openMdlEditarPaciente}
          handleClose={closeMdlEditarPaciente}
          idpaciente={idPaciente}
        />
      )}

      {mdlUltimosTurnos && (
        <MdlultimosTurnos
          show={openMdlUltimosTurnos}
          handleClose={closeMdlUltimosTurnos}
          idpaciente={idPaciente}
          paciente={apeyNom}
        />
      )}
      
    </>

  ); 

}


export default Pacientes;
