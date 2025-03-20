import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import "../css/sigetur.css";
import "../css/menu-hamburguesa.css";

import Button from "react-bootstrap/Button";

import Image from "react-bootstrap/Image";

import PizarradeTurnos from "./turnos/pizarradeturnos";

import ObrasSociales from "./obrassociales/obrassociales";

import Profesionales from "./profesionales/profesionales";

import Pacientes from "./pacientes/pacientes";

import AgendaSemanal from "./profesionales/agendasemanal";

export default function sigetur() {
  const [mostrarProfesional, setMostrarProfesional] = useState(false);

  const [mostrarObraSocial, setMostrarObraSocial] = useState(false);

  const [mostrarPaciente, setMostrarPaciente] = useState(false);

  const [mostrarPizarradeTurnos, setMostrarPizarradeTurnos] = useState(false);

  const [mostrarAgendaSemanal, setMostrarAgendaSemanal] = useState(false);

  const [titulo, setTitulo] = useState("");

  const MostrarObraSocial = () => {
    setMostrarPizarradeTurnos(false);
    setMostrarPaciente(false);
    setMostrarObraSocial(true);
    setMostrarProfesional(false);
    setMostrarAgendaSemanal(false);
    setTitulo("GESTIÓN DE OBRAS SOCIALES");
    setOpen(false);
  };

  const MostrarProfesionales = () => {
    setMostrarPizarradeTurnos(false);
    setMostrarPaciente(false);
    setMostrarObraSocial(false);
    setMostrarProfesional(true);
    setMostrarAgendaSemanal(false);
    setTitulo("GESTIÓN DE PROFESIONALES");
    setOpen(false);
  };

  const MostrarPacientes = () => {
    setMostrarPizarradeTurnos(false);
    setMostrarPaciente(true);
    setMostrarObraSocial(false);
    setMostrarProfesional(false);
    setMostrarAgendaSemanal(false);
    setTitulo("GESTIÓN DE PACIENTES");
    setOpen(false);
  };

  const MostrarPizarradeTurnos = () => {
    setMostrarPaciente(false);
    setMostrarObraSocial(false);
    setMostrarPizarradeTurnos(true);
    setMostrarProfesional(false);
    setMostrarAgendaSemanal(false);
    setTitulo("PIZARRA DE TURNOS");
    setOpen(false);
  };

  const MostrarAgendaSemanal = () => {
    setMostrarPaciente(false);
    setMostrarObraSocial(false);
    setMostrarPizarradeTurnos(false);
    setMostrarProfesional(false);
    setMostrarAgendaSemanal(true);
    setTitulo("AGENDA SEMANAL POR PROFESIONAL");
    setOpen(false);
  };

  const varpaciente = "FIGUEROA, RODOLFO";

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
              width: "15%",
              backgroundColor: "#2980B9",
              marginLeft: "25px",
            }}
          >
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
              <Image
                style={{
                  width: "30px",
                  height: "30px",
                }}
                src="assets/sinfoto.png"
                roundedCircle
              />
              <h6 style={{ margin: 0 }}>
                Usuario: <br /> {varpaciente}
              </h6>
            </div>
          </div>
          {/*  */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "right",
              width: "10%",
              height: "60px",
              backgroundColor: "#2980B9",
            }}
          >
            {/* Botón hamburguesa */}
            {/*    <button
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: "30px",
                cursor: "pointer",
                marginLeft: "15px",
              }}
              onClick={toggleMenu}
            >
              ☰
            </button>
            {menuVisible && (
              <div
                style={{
                  position: "absolute",
                  top: "40px",
                  right: "0",
                  backgroundColor: "white",
                  color: "black",
                  borderRadius: "5px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  padding: "10px",
                  width: "200px",
                }}
              >
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  <li style={{ padding: "8px", cursor: "pointer" }}>
                    <a
                      href="/pizarra-turnos"
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      📅 Pizarra de turnos
                    </a>
                  </li>
                  <li style={{ padding: "8px", cursor: "pointer" }}>
                    <a
                      href="/agenda-semanal"
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      📆 Agenda Semanal
                    </a>
                  </li>
                  <li style={{ padding: "8px", cursor: "pointer" }}>
                    <a
                      href="/profesionales"
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      👨‍⚕️ Profesional
                    </a>
                  </li>
                  <li style={{ padding: "8px", cursor: "pointer" }}>
                    <a
                      href="/pacientes"
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      🩺 Pacientes
                    </a>
                  </li>
                </ul>
              </div>
            )} */}{" "}
            {/* Botón para abrir el menú */}
            <IconButton
              onClick={() => toggleDrawer(true)}
              style={{ position: "fixed", right: 20, top: 20 }}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
            {/* Drawer (Menú lateral derecho) */}
            {/* Drawer (Menú lateral derecho) */}
            <Drawer
              anchor="right"
              open={open}
              onClose={() => toggleDrawer(false)()}
            >
              <List style={{ width: 250 }}>
                <ListItem button onClick={MostrarPizarradeTurnos}>
                  <ListItemText primary="Pizarra de turnos" />
                </ListItem>
                <ListItem button onClick={MostrarAgendaSemanal}>
                  <ListItemText primary="Agenda Semanal" />
                </ListItem>
                <ListItem button onClick={MostrarProfesionales}>
                  <ListItemText primary="Profesionales" />
                </ListItem>
                <ListItem button onClick={MostrarPacientes}>
                  <ListItemText primary="Pacientes" />
                </ListItem>
                <ListItem button onClick={MostrarObraSocial}>
                  <ListItemText primary="Obras Sociales" />
                </ListItem>
              </List>
            </Drawer>
            <button
              title="Ayuda"
              className="btn btn-sm btn-light btn-outline-primary"
              style={{
                alignItems: "center",
                height: "30px",
                marginTop: "15px",
                marginRight: "15px",
              }}
            >
              <i class="fa-regular fa-circle-question"></i>
            </button>
          </div>
        </div>

        <div
          style={{ display: "flex", width: "100%", backgroundColor: "white" }}
        >
          {mostrarProfesional && <Profesionales />}
          {mostrarPaciente && <Pacientes />}
          {mostrarPizarradeTurnos && <PizarradeTurnos />}
          {mostrarObraSocial && <ObrasSociales />}
          {mostrarAgendaSemanal && <AgendaSemanal />}
        </div>
      </div>
    </>
  );
}
