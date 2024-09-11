import React, { useState, useEffect } from "react";


import Table from "react-bootstrap/Table";

import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import "/src/css/sigetur.css";


import { obrassocialesService } from "/src/services/obrassociales.service";



import modalDialogService from "/src/services/modalDialog.service";


 function ObrasSociales() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Descripcion, SetDescripcion]  = useState(null);



  const [currentPage, setCurrentPage] = useState(1);
  


  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);






  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }
    modalDialogService.BloquearPantalla(true);
    const data = await obrassocialesService.Buscar(Descripcion, _pagina);
    modalDialogService.BloquearPantalla(false);
    setItems(data.Items);
    setRegistrosTotal(data.RegistrosTotal);

    //generar array de las páginas para mostrar en select del paginador
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await obrassocialesService.BuscarPorId(item);
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
  
  

  async function Grabar(item) {
    // agregar o modificar
    try
    {
      await obrassocialesService.Grabar(item);
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
           Obras Sociales <small>{TituloAccionABMC[AccionABMC]}</small>
      
            
          </div>
          
          <div style={{ width: "30%", textAlign: "right" }}>
          <button
              title="Registrar nueva obra social"
              className="btn btn-sm btn-light btn-outline-primary"
              
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
              Obra Social
            </InputGroup.Text>
            <Form.Control
              placeholder="Buscar por nombre de la obras social"
              aria-label="Buscar obras social"
              aria-describedby="basic-addon2"
              onChange={(e) => SetDescripcion(e.target.value)}
              value={Descripcion}
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
            />
            <Button
             title="Buscar por DNI"
              variant="outline-secondary"
              id="button-addon1"
              style={{ height: "38px" }}
              color="white"
             
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
                  Obras Social
                </th>
                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                 
                >
                  Cuit/Cuil
                </th>

                <th style={{ textAlign: "center",backgroundColor: "rgb(136, 161, 184)" }} >
                 EMail
                </th>
                <th style={{ textAlign: "center",backgroundColor: "rgb(136, 161, 184)" }} >
                 Celular de contacto
                </th>
                <th style={{ textAlign: "center",backgroundColor: "rgb(136, 161, 184)" }} >
                  Domicilio
                </th>
                <th style={{ textAlign: "center",backgroundColor: "rgb(136, 161, 184)" }} >
                 Nro.
                </th>
                <th style={{ textAlign: "center",backgroundColor: "rgb(136, 161, 184)" }} key="4">
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
               <td style={{ textAlign: "center", fontSize:"12px" }}>
                {Item.Descripcion}
               </td>
               <td style={{ textAlign: "center", fontSize:"12px" }}>{Item.CUITCUIL}</td>
               <td style={{ textAlign: "center", fontSize:"12px" }}>{Item.email}</td>
               <td style={{ textAlign: "center", fontSize:"12px" }}>{Item.TeCelular}</td>
               <td style={{ textAlign: "center", fontSize:"12px" }}>{Item.Domicilio}</td>
               <td style={{ textAlign: "center", fontSize:"12px" }}>{Item.Nro}</td>
              
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
            <button className="btn btn-primary float-end" onClick={() => Imprimir()}>
              <i class="fa fa-print"></i>Imprimir
            </button>
          </div>
        </div>
      </div>   
      
    </div>
    

    </>

  ); 

}


export default ObrasSociales;