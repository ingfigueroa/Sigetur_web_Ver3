import { useContext, useState, useEffect } from "react";

import { useNavigate, useLocation, useSearchParams } from "react-router-dom";



import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PeopleIcon from "@mui/icons-material/People";
import GroupIcon from "@mui/icons-material/Group";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";

import Tooltip from "@mui/material/Tooltip";

import "../css/sigetur.css";
import "../css/menu-hamburguesa.css";

import {clientesServices} from "../services/clientes.service";



import Image from "react-bootstrap/Image";

import PizarradeTurnos from "./turnos/pizarradeturnos";

import PizarradeTurnosProfesional from "./turnos/pizarradeturnosprofesional";

import ConsultaTurnos from "./turnos/consultaturno";

import ListadeEsperaV1 from "../components/listadeespera/listadeespera_ver1";

import ObrasSociales from "./obrassociales/obrassociales";

import Profesionales from "./profesionales/profesionales";

import Pacientes from "./pacientes/pacientes";

import AgendaSemanal from "./profesionales/agendasemanal";

import DashboardTurnos from "./dashboard/dashboard_general";

import HistoriaClinica from "./historiasclinicas/hc_historia_clinica";


import { AuthContext } from "../context/AuthContext"; // 👈 IMPORTANTE



export default function sigetur() {

  const navigate = useNavigate();
  //traigo el objeto user desde el login
  const user = JSON.parse(localStorage.getItem("user"));


  const [mostrarProfesional, setMostrarProfesional] = useState(false);

  const location = useLocation();
  const { clientId, userId } = useContext(AuthContext);

   const [status, setStatus] = useState("invalid");

   const [titulo, setTitulo] = useState("PIZARRA DE TURNOS");
   const [razonsocialCliente, setRazonsocialCliente] = useState("");

   const [nombreUsuario, setNombreUsuario] = useState("");
   const [perfil, setPerfil] = useState("");

  const [cantidadProfesionales, setCantidadProfesionales] = useState("");

  const [vistaActiva, setVistaActiva] = useState("");

  const cambiarVista = (vista, titulo) => {
   
  setVistaActiva(vista);
  setTitulo(titulo);
  setOpen(false);
};


const MostrarHistoriaClinica = () => {
  cambiarVista("historiaClinica", "GESTIÓN DE HISTORIA CLINICA");
};

const MostrarListaDeEspera = () => {
  cambiarVista("listaespera", "ADMINISTRAR LISTA DE ESPERA - TURNOS");
};

const MostrarProfesionales = () => {
  cambiarVista("profesionales", "GESTIÓN DE PROFESIONALES");
};

const MostrarPacientes = () => {
  cambiarVista("pacientes", "GESTIÓN DE PACIENTES");
};

const MostrarPizarradeTurnos = () => {
  cambiarVista("pizarradeturnos", "PIZARRA DE TURNOS");
};


const MostrarAgendaSemanal = () => {
  cambiarVista("agendasemanal", "AGENDA SEMANAL POR PROFESIONAL");
};

const MostrarConsulta = () => {
  cambiarVista("consultas", "CONSULTAS E INFORMES");
};

const MostrarDashboard = () => {
  cambiarVista("dashboard", "DASHBOARD");
};

const MostrarObrasSociales = () => {
  cambiarVista("obrasociales", "GESTIÓN DE OBRAS SOCIALES");
};


  



  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => {
    setOpen(state);
  };

  const handleLogout = () => {

  localStorage.removeItem("token");

  // opcional
  localStorage.removeItem("user");

  window.location.href = "/login";
};


  useEffect(() => {
  if (!user?.clienteid || !user?.usuarioid) return;



      const cargarDatos = async () => {

    
        try {
          const data = await clientesServices.getValoresPantallaInicial(user.clienteid, user.usuarioid);

          

          const cantprof = data.cantidadprofesionales?.[0]?.Cantidaprofesionales ?? 0;

          setCantidadProfesionales(cantprof);

          setRazonsocialCliente(data.cliente?.[0]?.Cliente);
          setNombreUsuario(data.usuario?.[0]?.Usuario);
          setPerfil(data.perfil?.[0]?.Perfil)

          if (cantprof === 0){
              setTimeout(() => {
          cambiarVista("profesionales", "GESTIÓN DE PROFESIONALES");;
          }, 2000);
          }

        } catch (error) {
          console.error("Error al cargar datos:", error);
        }
      };


      cargarDatos();
}, [clientId, userId]);


useEffect(() => {
  if (!perfil) return;

  if (perfil === "PROFESIONAL") {
     console.log("pasa por useeffect")
    cambiarVista("pizarradeturnosprofesional", "MIS TURNOS");
    return;
  }

  if (perfil === "SECRETARIA") {
    cambiarVista("pizarradeturnos", "PIZARRA DE TURNOS");
    return;
  }
 

  if (perfil === "ADMINISTRADOR") {
   //cambiarVista("dashboard", "DASHBOARD");
    return;
  }

  navigate("/login");
}, [perfil]);


  return (
    <>
      <div className="sigetur">
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "60px",
            backgroundColor: "#2980B9",
          }}
        >
          <div
            style={{
              width: "25%",
              backgroundColor: "#2980B9",
              marginLeft: "0 px",
            }}
          >
            <IconButton
              onClick={() => toggleDrawer(true)}
              style={{ color: "white", marginLeft: "auto" }}
            >
              <MenuIcon fontSize="large" />
            </IconButton>

            <a href="/">
              <img
                src="./assets/Logo_2022_resolucion.jpg"
                alt=""
                style={{ margin: "20px 20px" }}
              />
            </a>
            
            
          </div>
           
          <div
            style={{
              width: "85%",
              backgroundColor: "#2980B9",

              color: "white",
              display: "flex", // Usa flexbox
              alignItems: "center", // Centra verticalmente
              justifyContent: "space-between", // Separa los elementos, titulo a la izquierda y el resto a la derecha
              padding: "0 15px", // Espaciado lateral
            }}
          >
             

          

            
            {/* Título alineado a la izquierda */}
            <h3 style={{ textAlign: "left", margin: 0 }}>{titulo}</h3>

            {/* Contenedor derecho con usuario e imagen */}
            <div style={{ display: "flex", alignItems: "right", gap: "10px" }}>
              <h6 style={{ margin: 0, color: "white", fontSize: "12px" }}>
                
                Consultorio: <br />{razonsocialCliente}
              </h6>
              {/* <Image
                style={{
                  width: "30px",
                  height: "30px",
                }}
                src="assets/sinfoto.png"
                roundedCircle
              /> */}

              <h6 style={{ margin: 0,  fontSize: "12px" }}>
                
                Usuario: <br /> {nombreUsuario}
              </h6>
               <h6 style={{ margin: 0,  fontSize: "12px" }}>
                
                Perfil: <br /> {perfil}
              </h6>
              <Tooltip title="Cerrar sesión">
             <IconButton
                  onClick={handleLogout}
                  style={{ color: "white" }}

                >
                  <LogoutIcon />
              </IconButton>
            </Tooltip>
            </div>
            
          </div>
          {/*  */}


          {/* Drawer (Menú lateral derecho) */}
          <Drawer
            anchor="left"
            open={open}
            onClose={() => toggleDrawer(false)()}
          >
            <List style={{ width: 280, padding: 0 }}>
              <ListItem
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#2980B9",
                  color: "white",
                  margin: "5px 0px 5px 0px",
                }}
              >
                <img
                  src="./assets/Logo_2022_resolucion.jpg"
                  alt="Logo"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "60px",
                    objectFit: "contain",
                  }}
                />
              </ListItem>

              <Divider
                sx={{
                  marginY: "0.5",
                  height: "2px",
                  backgroundColor: "black",
                }}
              />

              <ListItem
                button
                onClick={MostrarPizarradeTurnos}
                sx={{
                  "&:hover": {
                    backgroundColor: "#2980B9",
                    color: "white", // texto blanco al hacer hover
                    "& .MuiListItemIcon-root": {
                      color: "white", // ícono blanco también
                    },
                  },
                }}
              >
                <ListItemIcon>
                  <CalendarTodayIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Pizarra de turnos" />
              </ListItem>

              <ListItem
                button
                onClick={MostrarAgendaSemanal}
                sx={{
                  "&:hover": {
                    backgroundColor: "#2980B9",
                    color: "white", // texto blanco al hacer hover
                    "& .MuiListItemIcon-root": {
                      color: "white", // ícono blanco también
                    },
                  },
                }}
              >
                <ListItemIcon>
                  <EventNoteIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Agenda Semanal" />
              </ListItem>

              <ListItem
                button
                onClick={MostrarProfesionales}
                sx={{
                  "&:hover": {
                    backgroundColor: "#2980B9",
                    color: "white", // texto blanco al hacer hover
                    "& .MuiListItemIcon-root": {
                      color: "white", // ícono blanco también
                    },
                  },
                }}
              >
                <ListItemIcon>
                  <GroupIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Profesionales" />
              </ListItem>

              <ListItem
                button
                onClick={MostrarPacientes}
                sx={{
                  "&:hover": {
                    backgroundColor: "#2980B9",
                    color: "white", // texto blanco al hacer hover
                    "& .MuiListItemIcon-root": {
                      color: "white", // ícono blanco también
                    },
                  },
                }}
              >
                <ListItemIcon>
                  <PeopleIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Pacientes" />
              </ListItem>

              <ListItem
                button
                onClick={MostrarObrasSociales}
                sx={{
                  "&:hover": {
                    backgroundColor: "#2980B9",
                    color: "white", // texto blanco al hacer hover
                    "& .MuiListItemIcon-root": {
                      color: "white", // ícono blanco también
                    },
                  },
                }}
              >
                <ListItemIcon>
                  <LocalHospitalIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Obras Sociales" />
              </ListItem>

                <ListItem
                button
                onClick={MostrarHistoriaClinica}
                sx={{
                  "&:hover": {
                    backgroundColor: "#2980B9",
                    color: "white", // texto blanco al hacer hover
                    "& .MuiListItemIcon-root": {
                      color: "white", // ícono blanco también
                    },
                  },
                }}
              >
                <ListItemIcon>
                  <LocalHospitalIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Historia Clínica" />
              </ListItem>

              <Divider sx={{ marginY: "0.5", backgroundColor: "black" }} />

              <ListItem
                button
                onClick={MostrarConsulta}
                sx={{
                  "&:hover": {
                    backgroundColor: "#2980B9",
                    color: "white", // texto blanco al hacer hover
                    "& .MuiListItemIcon-root": {
                      color: "white", // ícono blanco también
                    },
                  },
                }}
              >
                <ListItemIcon>
                  <SearchIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Consultas" />
              </ListItem>
              <Divider sx={{ marginY: "0.5", backgroundColor: "black" }} />
              <ListItem
                button
                onClick={MostrarListaDeEspera}
                sx={{
                  "&:hover": {
                    backgroundColor: "#2980B9",
                    color: "white", // texto blanco al hacer hover
                    "& .MuiListItemIcon-root": {
                      color: "white", // ícono blanco también
                    },
                  },
                }}
              >
                <ListItemIcon>
                  <EventNoteIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Lista de espera" />
              </ListItem>
              <ListItem
                button
                onClick={MostrarDashboard}
                sx={{
                  "&:hover": {
                    backgroundColor: "#2980B9",
                    color: "white", // texto blanco al hacer hover
                    "& .MuiListItemIcon-root": {
                      color: "white", // ícono blanco también
                    },
                  },
                }}
              >
                <ListItemIcon>
                  <EventNoteIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="DashBoard" />
              </ListItem>

              {/* Podés agregar más secciones acá */}
            </List>
          </Drawer>
        </div>

        <div
          style={{ display: "flex", width: "100%", backgroundColor: "white" }}
        >

          {vistaActiva === "historiaClinica" && <HistoriaClinica />}
          {vistaActiva === "pacientes" && <Pacientes />}
          {vistaActiva === "profesionales" && <Profesionales />}
          {vistaActiva === "pizarradeturnos" && <PizarradeTurnos />}

          {vistaActiva === "pizarradeturnosprofesional" && <PizarradeTurnosProfesional />}

          {vistaActiva === "obrasocial" && <ObrasSociales />}

           {vistaActiva === "agendasemanal" && <AgendaSemanal />}
          {vistaActiva === "consultas" && <ConsultaTurnos />}

         
           
          {vistaActiva === "listaespera" && <ListadeEsperaV1 />}

          {vistaActiva === "dashboard" && <DashboardTurnos />}

        </div>
      </div>
    </>
  );
}
