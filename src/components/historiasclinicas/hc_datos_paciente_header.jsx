import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import { tiposexoService } from "/src/services/tiposexo.service";
import { tipodocumentoService } from "/src/services/tipoDocumento.service";


import { calcularEdadDiaMesAnio, getFechaDMY } from "../../components/utils/fecha";





const DatosPacienteHeader = ({ data, apellidonombres }) => {
/* 
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
 */
const getInputStyleControl = () => ({
  backgroundColor: "#e1f5fe",
  fontWeight: "bold",
  textAlign: "center",
  fontSize: "14px",
});

const getInputStyleText = () => ({
  backgroundColor: "#ffffff",
  
  textAlign: "center",
  fontSize: "14px",
});


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
          <InputGroup.Text
          style={{...getInputStyleText()}}
          >Tipo doc</InputGroup.Text>
          <Form.Control
            className="w-100 justify-content-center fw-bold"
            style={{...getInputStyleControl(), flex: "0 0 80px"}}
            value={ tipoDocumento || ""}
            readOnly
          />

          <InputGroup.Text 
          style={{...getInputStyleText()}}
          >Nro</InputGroup.Text>
          <Form.Control
            className="w-100 justify-content-center fw-bold"
            value={NroDocumento || ""}
            style={{...getInputStyleControl(), flex: "0 0 120px"}}
            readOnly // 👈 ancho fijo
          />

            <InputGroup.Text 
          style={{...getInputStyleText()}}
          >Apellido</InputGroup.Text>
          <Form.Control
            className="justify-content-center fw-bold"
            value={Apellido || ""}
            style={{...getInputStyleControl(),
              flex: "0 0 260px",
            }}
            readOnly
          />

            <InputGroup.Text 
          style={{...getInputStyleText()}}
          >Nombres</InputGroup.Text>

          <Form.Control
            className="justify-content-center fw-bold"
            value={Nombres || ""}
             style={{...getInputStyleControl(), 
              flex: "0 0 260px",
             }}
             readOnly
          />

             <InputGroup.Text 
          style={{...getInputStyleText()}}
          >Sexo</InputGroup.Text>
          <Form.Control
            className="justify-content-center fw-bold"
            value={tipoSexo || ""}
            style={{...getInputStyleControl(),
              flex: "0 0 120px",
              
            }} // 👈 ancho fijo
            readOnly
          />
        </InputGroup>

        <InputGroup className="mb-3">
        

            <InputGroup.Text 
          style={{...getInputStyleText()}}
          >Fecha nacimiento:</InputGroup.Text>
          <Form.Control
            className="justify-content-center fw-bold"
            value={fechaNacimiento || ""}
             style={{...getInputStyleControl(),
              flex: "0 0 120px",
              
            }}
            readOnly // 👈 ancho fijo
          />

           <InputGroup.Text 
          style={{...getInputStyleText()}}
          >Edad</InputGroup.Text>
          <Form.Control
            className="justify-content-center fw-bold"
             style={{...getInputStyleControl(),
              flex: "0 0 100px",
              
            }} // 👈 ancho fijo
            value={edad ? `${edad} años` : ""}
            readOnly
          />

            <InputGroup.Text 
          style={{...getInputStyleText()}}
          >Correo Electrónico</InputGroup.Text>
          <Form.Control
            className="justify-content-center fw-bold"
            value={EMail || ""}
              style={{...getInputStyleControl(),
              flex: "0 0 320px",
              
            }}
            readOnly // 👈 ancho fijo
          />

            <InputGroup.Text 
          style={{...getInputStyleText()}}
          >Celular</InputGroup.Text>
          <Form.Control
            className="justify-content-center fw-bold"
            value={TECelular || ""}
              style={{...getInputStyleControl(),
              flex: "0 0 180px",
              
            }}
            readOnly 
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
