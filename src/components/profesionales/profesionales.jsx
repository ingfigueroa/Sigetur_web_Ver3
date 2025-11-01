import React, { useState, useEffect } from "react";
//import { format, parse } from "date-fns";

import Table from "react-bootstrap/Table";

import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import "/src/css/sigetur.css";
import "/src/css/pizarradeturnos.css";

import { profesionalesService } from "/src/services/profesional.service";
import MdlAltaProfesionales from "./registrarprofesional";
import Mdlhorarioprofesional from "../profesionales/mdlhorarioprofesional";
import Mdlanulartodoslosturnos from "../turnos/mdlanulartodoslosturnos";
import MdlEditarProfesionales from "./modificarprofesionales";
import MdlTurnosLibresDelMes from "../turnos/mdlturnoslibresdelmes";

import MDLEstaSeguro from "../modales/mdlEstaSeguro";




import modalDialogService from "/src/services/modalDialog.service";

function Profesionales() {
  
  
   const [accionConfirmada, setAccionConfirmada] = useState(null);

  const [Apellido, SetApellido] = useState("");

  const [VarDNI, SetDNI] = useState(null);

  const [apeyNom, setapeyNom] = useState(null);

  const [idusuario, setUsuario] = useState("2");

  const [idProfesional, setIDProfesional] = useState(0);

  const [mdlRegistrarProfesional, setModalRegistrarProfesional] = useState(false);

    const [mdlEditarProfesional, setMdlEditarProfesional] = useState(false);

  const [observacionesBaja, setObservacionesBaja] = useState("")

  const [mdlHoraProfe, setModalHoraProfe] = useState(false);

  const [mdlAnularTodosLosTurnos, setModalAnularTodosLosTurnos] = useState(false);

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [idProfesion, setIDProfesion] = useState(0);

    const [profesion, setProfesion] = useState("");
  const [Paginas, setPaginas] = useState([]);

  const [Fecha, SetFecha] = useState(new Date().toLocaleDateString());

   const [fechaFinal, setFechaFinal] = useState("");

   const [fechaSistema, setFechaSistema] = useState("");

  const [modalTitulo, setModalTitulo] = useState();
  const [modalCuerpo, setModalCuerpo] = useState();
    const [showMDLEstaSeguro, setShowMDLEstaSeguro] = useState("");

  const [mdlListaEspera, setModalListaEspera] = useState(false);
  const [mdlTurnosLIbresDelMes, setModalTurnosLIbresDelMes] = useState(false)
  const [CantidaddeRegistros, setCantidaddeRegistros] = useState(10);

  const closeMdlListaEspera = () => {
    setModalListaEspera(false);
  };

  const openMdlListaEspera = () => {
    setModalListaEspera(true);
  };

  
  const openMdlEstaSeguro = () => {
    setShowMDLEstaSeguro(true);
  };

  const closeMdlEstaSeguro = () => {
    setShowMDLEstaSeguro(false);
  };
  
  const closeModalTurnosLIbresDelMes = () => {
    setModalTurnosLIbresDelMes(false);
  };

  const openMdlTurnosLIbresDelMes = (item) => {

     setIDProfesional(item.ID);
    const apyNom = `${item.Apellido || ""}, ${item.Nombres || ""}`; // Concatenar manejando valores nulos
    setapeyNom(apyNom.trim()); 
    setProfesion(item.especialidad)
    setModalTurnosLIbresDelMes(true);
  };

  const openMdlHoraProfe = (item) => {
    setIDProfesional(item.ID);
    const apyNom = `${item.Apellido || ""}, ${item.Nombres || ""}`; // Concatenar manejando valores nulos
    setapeyNom(apyNom.trim()); // Eliminar espacios en blanco innecesarios
    setModalHoraProfe(true);
  };


  const mdlSiNo = async (respuesta) => {
    if (respuesta) {
        console.log(idProfesional)
        if (idProfesional > 0) {
          const data = await profesionalesService.GrabarBaja(
            idProfesional,
            observacionesBaja,

            idusuario
          );
          
        }

        
      } 
       Buscar(1)
    };
  



  const closeMdlHoraProfe = () => {
    setModalHoraProfe(false);
  };

  const openMdlRegistrarProfe = () => {
    setModalRegistrarProfesional(true);
  };

  const closeMdlRegistrarProfe = () => {
    setModalRegistrarProfesional(false);
    Buscar(1)
  };

  const openMdlEditarProfesional = (item) => {
    setIDProfesional(item.ID)
    setMdlEditarProfesional(true);
  };

  const closeMdlEditarProfesional = () => {
    setMdlEditarProfesional(false);
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
    const data = await profesionalesService.Buscar(Apellido, VarDNI, idProfesion,  _pagina, CantidaddeRegistros);
    modalDialogService.BloquearPantalla(false);

     setItems(data.registros);
    
   
     setRegistrosTotal(data.total);
    

    //generar array de las páginas para mostrar en select del paginador
    const arrPaginas = [];
    
    for (let i = 1; i <= Math.ceil(data.total / CantidaddeRegistros); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }


  async function Limpiar(params) {
      SetApellido("")
      SetDNI("")
      setItems([])
  }

  function Imprimir() {
    modalDialogService.Alert("En desarrollo...");
  }

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }
  const transitarapasivoprofesional = (id) =>{
    setIDProfesional(id)
    setModalTitulo("Dar de baja el profesional");
    setModalCuerpo(
      "¿Desea dar de baja al profesional?<br/>Se anularán todos los turnos a partir de mañana.<br/>Los turnos que se anulan son los que tienen estado PENDIENTE y LIBRE."
    );
      setAccionConfirmada(1);
    setShowMDLEstaSeguro(true);
  }

// const fechaActual = formatearFecha(new Date());

useEffect(() => {
  document.title = "Si.Ge.Tur. - Profesionales";
  setObservacionesBaja("SE DEFINE LA BAJA DEL PROFESIONAL.")
}, []);

  useEffect(() => {
    const hoy = new Date();
   
    // Crear una fecha con el mes siguiente y día 0
    const ultimoDiaMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);

    const dia = String(hoy.getDate()).padStart(2, '0');        // "01" a "31"
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');   // "01" a "12"
    const anio = hoy.getFullYear();

    // Concatenar en formato YYYY-MM-DD
    const fechaSistemaFormateada = `${anio}-${mes}-${dia}`;
    
     setFechaSistema(fechaSistemaFormateada)

      const dia1 = String(ultimoDiaMes.getDate()).padStart(2, '0');        // "01" a "31"
const mes1 = String(ultimoDiaMes.getMonth() + 1).padStart(2, '0');   // "01" a "12"
const anio1 = ultimoDiaMes.getFullYear();
    // Formatear la fecha (ej: dd/mm/yyyy)
    const fechaFormateada = `${anio1}-${mes1}-${dia1}`;
   
    setFechaFinal(fechaFormateada);
  }, []); 


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
                title="Registrar nuevo profesional"
                className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
                onClick={(event) => {
                  event.preventDefault();
                  openMdlRegistrarProfe();
                }}
              >
                <i class="fa-solid fa-plus"></i>
              </button>

              <button
                title="Imprimir"
                className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
                onClick={() => Imprimir()}
              >
                <i class="fa fa-print"></i>
              </button>
            </div>
          </div>
         
<hr></hr>
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
                type="text"
                onChange={(e) => SetApellido(e.target.value.toUpperCase())}
                value={Apellido}
                autoFocus
              />

              <Button
                title="Buscar por profesional"
                variant="outline-secondary"
                id="button-addon1"
                style={{ height: "38px" }}
                color="white"
                
                onClick={() => Buscar(1)}
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
                onClick={() => Buscar(1)}
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
              <tr className="h-50">
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

                <th
                  style={{
                    textAlign: "left",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                >
                  Nombres
                </th>

                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                  key="2"
                >
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

                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                  key="4"
                >
                  EMail
                </th>
                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                  key="5"
                >
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
                    <td style={{ textAlign: "center", fontSize: "12px" }}>{Item.ID}</td>
                    <td style={{ textAlign: "left", fontSize: "12px" }}>
                      {Item.Apellido}
                    </td>
                    <td style={{ textAlign: "left", fontSize: "12px" }}>
                      {Item.Nombres}
                    </td>
                    <td style={{ textAlign: "center", fontSize: "12px" }}>
                      {Item.especialidad}
                    </td>
                    <td style={{ textAlign: "center", fontSize: "12px" }}>
                      {Item.NroDocumento}
                    </td>
                    <td style={{ textAlign: "center", fontSize: "12px" }}>
                      {Item.EMail}
                    </td>
                    <td style={{ textAlign: "center", fontSize: "12px" }}>
                      {Item.IDEstado === 1 ? (
                        <Button
                          variant="success"
                          size="sm"
                          style={{ width: "70%" }}
                          onClick={() => transitarapasivoprofesional(Item.ID)}   // 👈 acá el onClick
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
                        title="Editar profesional"
                        className="btn btn-sm btn-light btn-danger"
                        onClick={() => openMdlEditarProfesional(Item)} 
                        //onClick={openMdlEditarProfesional(Item)}
                      >
                        <i class="fa-solid fa-user-pen"></i>
                      </button>
                      <button
                        title="Horarios profesional"
                        className="btn btn-sm btn-light btn-primary"
                        onClick={() => openMdlHoraProfe(Item)}
                      >
                        <i class="fa-solid fa-clock"></i>
                      </button>
                      <button
                        title="Próximos turnos libres del mes."
                        className="btn btn-sm btn-light btn-danger"
                         onClick={() => openMdlTurnosLIbresDelMes(Item)}
                      >
                       <i class="fas fa-calendar-day"></i>
                      </button>
                      <button
                        title="Dashboard"
                        className="btn btn-sm btn-light btn-danger"
                      >
                         <i class="fa-solid fa-chart-pie"></i>
                      </button>
                    {/*   <button
                        title="Cancelar turnos por fecha"
                        className="btn btn-sm btn-light btn-danger"
                        onClick={() => openMdlAnularTodosLosTurnos(Item)}
                        value={Fecha}
                      >
                        <i class="fa-solid fa-power-off"></i>
                      </button> */}
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
           
              {Paginas?.map((x) => 
             
              (
                
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

      {mdlRegistrarProfesional && (
        <MdlAltaProfesionales
          show={openMdlRegistrarProfe}
          handleClose={closeMdlRegistrarProfe}
        />
      )}

      {mdlEditarProfesional && (
        <MdlEditarProfesionales
          show={openMdlEditarProfesional}
          handleClose={closeMdlEditarProfesional}
          idprofesional={idProfesional}
        />
      )}

      {mdlHoraProfe && (
        <Mdlhorarioprofesional
          show={openMdlHoraProfe}
          handleClose={closeMdlHoraProfe}
          idprofesional={idProfesional}
          fecha={fechaSistema}
          profesional={apeyNom}
        />
      )}

        {mdlTurnosLIbresDelMes && (
        <MdlTurnosLibresDelMes
          show={openMdlTurnosLIbresDelMes}
          handleClose={closeModalTurnosLIbresDelMes}
          profesional={apeyNom}
          profesion={profesion}
          idprofesional={idProfesional}
          fechainicio={fechaSistema}
          fechafinal={fechaFinal}
         
        />
      )}

      {mdlAnularTodosLosTurnos && (
        <Mdlanulartodoslosturnos
          show={setModalAnularTodosLosTurnos}
          handleClose={closeMdlAnularTodosLosTurnos}
          fecha={Fecha}
          idprofesional={idProfesional}
          idusuario={idusuario}
          apeynom={apeyNom}
          vienede="profesionales"
          observaciones="POR PEDIDO DEL PROFESIONAL, SE CANCELAN LOS TURNOS DE ESTE DÍA."
        />
      )}
      
      {showMDLEstaSeguro && (
        <MDLEstaSeguro
          show={openMdlEstaSeguro}
          handleClose={closeMdlEstaSeguro}
          mensajetitulo={modalTitulo}
          mensajecuerpo={modalCuerpo}
          enviaralpadre={mdlSiNo}
        />
      )}
    </>
  );
}

export default Profesionales;
