import React from "react";
import Table from "react-bootstrap/Table";

import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const mdlhorarioprofesional = ({ show, handleClose }) => {
  const data = [
    
      { Dias: "LUNES", Mdesde: '08:00', MHasta: '14:00', Intervalo: '30', Tdesde: '17:00', THasta: '21:30', IntervaloT: '30', Ndesde: '', NHasta: '', IntervaloN: '' },
      { Dias: "MARTES", Mdesde: '', MHasta: '', Intervalo: '0', Tdesde: '17:00', THasta: '21:30', IntervaloT: '30',  Ndesde: '', NHasta: '', IntervaloN: '' },
      { Dias: "MIERCOLES", Mdesde: '08:00', MHasta: '14:00', Intervalo: '30', Tdesde: '17:00', THasta: '21:30', IntervaloT: '30', Ndesde: '', NHasta: '', IntervaloN: ''  },
      { Dias: "JUEVES", Mdesde: '08:00', MHasta: '14:00', Intervalo: '30', Tdesde: '17:00', THasta: '21:30', IntervaloT: '30', Ndesde: '', NHasta: '', IntervaloN: ''  },
      { Dias: "VIERNES", Mdesde: '08:00', MHasta: '14:00', Intervalo: '30', Tdesde: '', THasta: '', IntervaloT: '', Ndesde: '', NHasta: '', IntervaloN: ''  },
      { Dias: "SABADO", Mdesde: '', MHasta: '', Intervalo: '', Tdesde: '', THasta: '', IntervaloT: '',  Ndesde: '', NHasta: '', IntervaloN: ''},
      { Dias: "DOMINGO", Mdesde: '', MHasta: '', Intervalo: '', Tdesde: '', THasta: '', IntervaloT: '', Ndesde: '', NHasta: '', IntervaloN: '' }
    ];
  
 
  
  

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton style={{backgroundColor: '#0277bd', color: 'white'}} >
        <Modal.Title>Horarios profesional</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{width: '600px'}}

      >
        <div >
          <div >
          
             
            <InputGroup className="mb-3" size="sm">
                <InputGroup.Text style={{ backgroundColor: "#679bb9", color: "white" }}>PROFESIONAL</InputGroup.Text>
                <Form.Control value= "FIGUEROA, RODOLFO ALFREDO" aria-label="First name" style={{backgroundColor: '#d5dbdb', color: 'black'}}/>
                
            </InputGroup>
             
              
          
            <Table striped bordered hover style={{width:'750px'}}>
              <thead>
                <tr className="personalizarfila h-50">
               
                  
                  <th style={{ textAlign: "center" }} key="0">
                    Día
                  </th>

                  <th style={{ textAlign: "center" }} key="3">
                    Mañana desde
                  </th>

                  <th key="4">Mañana hasta</th>

                  <th style={{ textAlign: "center" }} key="3">
                    Intervalo
                  </th>
                  
                  <th style={{ textAlign: "center" }} key="3">
                    Tarde desde
                  </th>

                  <th key="4">Tarde hasta</th>

                  <th style={{ textAlign: "center" }} key="3">
                    Intervalo
                  </th>
                  <th style={{ textAlign: "center" }} key="3">
                    Noche desde
                  </th>

                  <th key="4">Noche hasta</th>

                  <th style={{ textAlign: "center" }} key="3">
                    Intervalo
                  </th>

                 


                  
                </tr>
              </thead>
              <tbody>

                {data.map((item) => (
                  <tr key={item.id}>
                    <td style={{ textAlign: "left"}}>{item.Dias}</td>
                    <td style={{ backgroundColor: item.Intervalo > 0 ? 'green' : 'red', textAlign: "center" }}>{item.Mdesde}</td>
                    <td style={{backgroundColor: item.Intervalo > 0 ? 'green' : 'red', textAlign: "center" }}>{item.MHasta}</td>
                    <td style={{ backgroundColor: item.Intervalo > 0 ? 'green' : 'red', textAlign: "center" }}>{item.Intervalo}</td>

                    <td style={{backgroundColor: item.IntervaloT > 0 ? 'green' : 'red',  textAlign: "center" }}>{item.Tdesde}</td>
                    <td style={{backgroundColor: item.IntervaloT > 0 ? 'green' : 'red',  textAlign: "center" }}s>{item.THasta}</td>
                    <td style={{backgroundColor: item.IntervaloT > 0 ? 'green' : 'red', textAlign: "center" }}>{item.IntervaloT}</td>
                    
                    <td style={{backgroundColor: item.IntervaloN > 0 ? 'green' : 'red', textAlign: "center" }}>{item.Ndesde}</td>
                    <td style={{backgroundColor: item.IntervaloN > 0 ? 'green' : 'red', textAlign: "center" }}s>{item.NHasta}</td>
                    <td style={{ backgroundColor: item.IntervaloN > 0 ? 'green' : 'red', textAlign: "center" }}>{item.IntervaloN}</td>
                   
                    
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Modal.Body>
     
    </Modal>
  );
};

export default mdlhorarioprofesional;
