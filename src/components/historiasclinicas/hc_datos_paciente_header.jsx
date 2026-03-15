import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import { tiposexoService } from "/src/services/tiposexo.service";
import { tipodocumentoService } from "/src/services/tipoDocumento.service";


import { calcularEdadDiaMesAnio, getFechaDMY } from "../../components/utils/fecha";



const emptyPaciente = {
  Apellido: "",
  Nombres: "",
  TipoDocumento: "",
  NroDocumento: "",
  FechaNacimiento: "",
  idsexo: "",
  EMail: "",
  TECelular: "",
};

const DatosPacienteHeader = ({ data, apellidonombres }) => {

  const [edad, setEdad] = useState(0);
  const [tipoSexo, setTipoSexo] = useState("");

  const [tipoDocumento, setTipoDocumento] = useState("");


  const [Apellido, setApellido] = useState("");
  const [Nombres, setNombres] = useState("");

  const [NroDocumento, setNroDocumento] = useState("");
  const [EMail, setEMail] = useState("");

  const [fechaNacimiento, setFechaNacimiento] = useState("");

  const [TECelular, setTECelular] = useState("");






 
  const limpiarCamposPaciente = () => {
  setApellido("");
  setNombres("");
  setNroDocumento("");
  setTECelular("");
  setTipoDocumento("");
  setTipoSexo("");
  setFechaNacimiento("");
  setEMail("");
  setEdad("");
};


const asignarCampos = (data) => {

  const fecha = getFechaDMY(data[0].FechaNacimiento);

  setApellido(data[0].Apellido);
  setNombres(data[0].Nombres);
  setNroDocumento(data[0].NroDocumento);
  setTECelular(data[0].TECelular);
  setTipoDocumento(data[0].tdocu);
  setTipoSexo(data[0].sexo);
  setFechaNacimiento(fecha);

  setEMail(data[0].EMail);
  setEdad(calcularEdadDiaMesAnio(fecha));
  apellidonombres(data[0].Apellido, data[0].Nombres, data[0].NroDocumento);

};


  useEffect(() => {
   
    if (fechaNacimiento) {
      setEdad(calcularEdadDiaMesAnio(fechaNacimiento));
     
    } else {
     
      setEdad(0);
    }
  }, [fechaNacimiento]);

useEffect(() => {

  if (!data || data.length === 0) {
    limpiarCamposPaciente();
    return;
  }

  asignarCampos(data);

}, [data]);





  return (
    <>
      <div style={{ width: "100%" }}>
       
        <InputGroup className="mb-3">
          <InputGroup.Text>Tipo doc</InputGroup.Text>
          <Form.Control
            className="w-100 justify-content-center fw-bold"
            style={{ flex: "0 0 80px", backgroundColor: "#e1f5fe" }}
            value={ tipoDocumento || ""}
            readOnly
          />

          <InputGroup.Text>Nro</InputGroup.Text>
          <Form.Control
            className="w-100 justify-content-center fw-bold"
            value={NroDocumento || ""}
            style={{ flex: "0 0 120px", backgroundColor: "#e1f5fe" }} // 👈 ancho fijo
          />

          <InputGroup.Text>Apellido</InputGroup.Text>
          <Form.Control
            className="justify-content-center fw-bold"
            value={Apellido || ""}
            style={{ textAlign: "center", backgroundColor: "#e1f5fe" }}
          />

          <InputGroup.Text>Nombres</InputGroup.Text>

          <Form.Control
            className="justify-content-center fw-bold"
            value={Nombres || ""}
            style={{ textAlign: "center", backgroundColor: "#e1f5fe" }}
          />

         
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text>Sexo</InputGroup.Text>
          <Form.Control
            className="justify-content-center fw-bold"
            value={tipoSexo || ""}
            style={{
              flex: "0 0 120px",
              textAlign: "center",
              backgroundColor: "#e1f5fe",
            }} // 👈 ancho fijo
            readOnly
          />

          <InputGroup.Text>Fecha nacimiento:</InputGroup.Text>
          <Form.Control
            className="justify-content-center fw-bold"
            value={fechaNacimiento || ""}
            style={{
              flex: "0 0 120px",
              textAlign: "center",
              backgroundColor: "#e1f5fe",
            }} // 👈 ancho fijo
          />

          <InputGroup.Text>Edad</InputGroup.Text>
          <Form.Control
            className="justify-content-center fw-bold"
            style={{
              flex: "0 0 100px",
              textAlign: "center",
              backgroundColor: "#e1f5fe",
            }} // 👈 ancho fijo
            value={edad ? `${edad} años` : ""}
            disabled
          />

          <InputGroup.Text>Email</InputGroup.Text>
          <Form.Control
            className="justify-content-center fw-bold"
            value={EMail || ""}
            style={{
              flex: "0 0 320px",
              textAlign: "center",
              backgroundColor: "#e1f5fe",
            }} // 👈 ancho fijo
          />

          <InputGroup.Text>Celular</InputGroup.Text>
          <Form.Control
            className="justify-content-center fw-bold"
            value={TECelular || ""}
            style={{
              flex: "0 0 180px",
              textAlign: "center",
              backgroundColor: "#e1f5fe",
            }}
          />
        </InputGroup>
        <hr
          style={{ width: "100%", backgroundColor: "black", height: "2px" }}
        />
      </div>

    </>
  );
};

export default DatosPacienteHeader;
