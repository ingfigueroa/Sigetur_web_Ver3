import { useContext, useState } from "react";
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

import "../css/sigetur.css";
import "../css/menu-hamburguesa.css";

import Button from "react-bootstrap/Button";

import Image from "react-bootstrap/Image";

import PizarradeTurnos from "./turnos/pizarradeturnos";

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
  const [mostrarProfesional, setMostrarProfesional] = useState(false);

  const [mostrarObraSocial, setMostrarObraSocial] = useState(false);

   const [mostrarHistoriaClinica, setMostrarHistoriaClinica] = useState(false);

  const [mostrarPaciente, setMostrarPaciente] = useState(false);

  const [mostrarPizarradeTurnos, setMostrarPizarradeTurnos] = useState(true);

  const [mostrarAgendaSemanal, setMostrarAgendaSemanal] = useState(false);

  const [mostraConsulta, setMostrarConsulta] = useState(false);

   const [mostraDashBoard, setMostrarDashboard] = useState(false);

  const [mostrarListadeEspera, setMostrarListadeEspera] = useState(false);

  const [titulo, setTitulo] = useState("PIZARRA DE TURNOS");


  const MostrarObraSocial = () => {
    setMostrarHistoriaClinica(false)
    setMostrarPizarradeTurnos(false);
    setMostrarPaciente(false);
    setMostrarListadeEspera(false);
    setMostrarObraSocial(false);
    setMostrarProfesional(false);
    setMostrarAgendaSemanal(false);
    setMostrarConsulta(false);
    setTitulo("GESTIÓN DE OBRAS SOCIALES");
    setOpen(false);
  };


  const MostrarHistoriaClinica = () => {
    setMostrarHistoriaClinica(true)
    setMostrarPizarradeTurnos(false);
    setMostrarPaciente(false);
    setMostrarListadeEspera(false);
    setMostrarObraSocial(false);
    setMostrarProfesional(false);
    setMostrarAgendaSemanal(false);
    setMostrarConsulta(false);
   
     setTitulo("GESTIÓN DE HISTORIA CLINICA");
    setOpen(false);
  };

  const MostrarListaDeEspera = () => {
    setMostrarHistoriaClinica(false)
    setMostrarPizarradeTurnos(false);
    setMostrarPaciente(false);
    setMostrarObraSocial(false);
    setMostrarProfesional(false);
    setMostrarAgendaSemanal(false);
    setMostrarConsulta(false);
    setMostrarDashboard(false);
    setMostrarListadeEspera(true);
    setTitulo("ADMINISTRAR LISTA DE ESPERA - TURNOS");
    setOpen(false);
  };

  const MostrarProfesionales = () => {
    setMostrarHistoriaClinica(false)
    setMostrarPizarradeTurnos(false);
    setMostrarPaciente(false);
    setMostrarObraSocial(false);
    setMostrarListadeEspera(false);
    setMostrarProfesional(true);
    setMostrarAgendaSemanal(false);
    setMostrarConsulta(false);
    setMostrarDashboard(false);
    setTitulo("GESTIÓN DE PROFESIONALES");
    setOpen(false);
  };

  const MostrarPacientes = () => {
    setMostrarHistoriaClinica(false)
    setMostrarPizarradeTurnos(false);
    setMostrarPaciente(true);
    setMostrarObraSocial(false);
    setMostrarProfesional(false);
    setMostrarListadeEspera(false);
    setMostrarAgendaSemanal(false);
    setMostrarConsulta(false);
    setMostrarDashboard(false);
    setTitulo("GESTIÓN DE PACIENTES");
    setOpen(false);
  };

  const MostrarPizarradeTurnos = () => {
    setMostrarHistoriaClinica(false)
    setMostrarPaciente(false);
    setMostrarObraSocial(false);
    setMostrarPizarradeTurnos(true);
    setMostrarProfesional(false);
    setMostrarListadeEspera(false);
    setMostrarAgendaSemanal(false);
    setMostrarConsulta(false);
    setMostrarDashboard(false);
    setTitulo("PIZARRA DE TURNOS");
    setOpen(false);
  };

  const MostrarAgendaSemanal = () => {
    setMostrarHistoriaClinica(false)
    setMostrarPaciente(false);
    setMostrarObraSocial(false);
    setMostrarPizarradeTurnos(false);
    setMostrarProfesional(false);
    setMostrarListadeEspera(false);
    setMostrarAgendaSemanal(true);
    setMostrarConsulta(false);
    setMostrarDashboard(false);
    setTitulo("AGENDA SEMANAL POR PROFESIONAL");
    setOpen(false);
  };

  const MostrarConsulta = () => {
    setMostrarHistoriaClinica(false)
    setMostrarPaciente(false);
    setMostrarObraSocial(false);
    setMostrarPizarradeTurnos(false);
    setMostrarProfesional(false);
    setMostrarListadeEspera(false);
    setMostrarAgendaSemanal(false);
    setMostrarConsulta(true);
   setMostrarDashboard(false);
    setTitulo("CONSULTA DE TURNOS");
    setOpen(false);
  };

  
  const MostrarDashboard = () => {
    setMostrarHistoriaClinica(false)
    setMostrarPaciente(false);
    setMostrarObraSocial(false);
    setMostrarPizarradeTurnos(false);
    setMostrarProfesional(false);
    setMostrarListadeEspera(false);
    setMostrarAgendaSemanal(false);
    setMostrarConsulta(false);
    setMostrarDashboard(true);
    setTitulo("DASHBOARD");
    setOpen(false);
  };

  const { clientId, userId } = useContext(AuthContext);

console.log(clientId, userId);
  const varusuario = userId;
  const varcliente = clientId;

  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => {
    setOpen(state);
  };

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
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <h6 style={{ margin: 0 }}>
                
                CONSULTORIO: <br />{clientId}
              </h6>
              <Image
                style={{
                  width: "30px",
                  height: "30px",
                }}
                src="assets/sinfoto.png"
                roundedCircle
              />

              <h6 style={{ margin: 0 }}>
                
                Usuario: <br /> {varusuario}
              </h6>
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
                onClick={MostrarObraSocial}
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
          {mostrarProfesional && <Profesionales />}
          {mostrarPaciente && <Pacientes />}
          {mostrarPizarradeTurnos && <PizarradeTurnos />}
          {mostrarObraSocial && <ObrasSociales />}
          {mostrarAgendaSemanal && <AgendaSemanal />}
          {mostraConsulta && <ConsultaTurnos />}

          {mostrarHistoriaClinica && <HistoriaClinica />}
           
          {mostrarListadeEspera && (
            <ListadeEsperaV1 />
          )}

          {mostraDashBoard && <DashboardTurnos />}

        </div>
      </div>
    </>
  );
}
