import React, { useState } from "react";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";


export default function registrarobrasocial() {
  const [show, setShow] = useState(false);

  return (
    <>
      <div
        style={{ display: "grid", width: "100%", backgroundcolor: "white" }}
      >
       
       <div className="acomodarencabezadoprfesional">
         

         <div style={{ width: "70%", textAlign: "center", color: "black", backgroundcolor: "white" }}>
           <h2>ADMINISTRAR OBRA SOCIAL</h2>
         </div>
        
        <div
          style={{
            display: "flex",
            width: "100%",
            padding: "20px 10px",
            backgroundColor: "white",
          }}
        >
          <div style={{ width: "70%", margin: "auto" }}>
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Denominación
              </InputGroup.Text>

              <Form.Control
                placeholder="Ingresar denominación"
                aria-label="Ingresar denominación"
                aria-describedby="basic-addon2"
                type="text"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Domicilio
              </InputGroup.Text>
              <Form.Control
                placeholder="Ingresar domicilio"
                aria-label="Ingresar domicilio"
                aria-describedby="basic-addon2"
                type="text"
                style={{ width: "60%" }}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Correo electrónico
              </InputGroup.Text>
              <Form.Control
                placeholder="Ingresar correo electrónico"
                aria-label="Ingresar correo electrónico"
                aria-describedby="basic-addon2"
                type="mail"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Calle
              </InputGroup.Text>
              <Form.Control
                placeholder="Ingresar calle"
                aria-label="Ingresar calle"
                aria-describedby="basic-addon2"
                type="text"
              />
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Número
              </InputGroup.Text>
              <Form.Control
                placeholder="Ingresar número"
                aria-label="Ingresar número"
                aria-describedby="basic-addon2"
                type="text"
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Localidad
              </InputGroup.Text>
              <Form.Control
                placeholder="Ingresar localidad"
                aria-label="Ingresar localidad"
                aria-describedby="basic-addon2"
                type="text"
                sytle={{ width: "50%" }}
              />
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Provincia
              </InputGroup.Text>
              <select>
                <option value="someOption">CÓRDOBA</option>
                <option value="otherOption">BUENOS AIRES</option>
                <option value="someOption">SANTA FE</option>
                <option value="otherOption">SAN LUIS</option>
              </select>
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                País
              </InputGroup.Text>
              <select>
                <option value="someOption">ARGENTINA</option>
              </select>
            </InputGroup>
          </div>
        </div>
        </div> 
        <div
          style={{
            width: "70%",
            margin: "0 auto",
            backgroundColor: "white",
            textAlign: "right",
          }}
        >
          <ButtonGroup className="mb-2">
            <Button variant="success">Grabar</Button>
            <Button variant="primary">Limpiar</Button>
            <Button variant="primary">Cerrar</Button>
          </ButtonGroup>
        </div>
      </div>
    </>
  );
}
