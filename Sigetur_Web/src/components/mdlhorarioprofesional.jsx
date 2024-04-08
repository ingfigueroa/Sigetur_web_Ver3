import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const mdlhorarioprofesional = ({ show, handleClose }) => {
  const data = [
    
      { Dias: "LUNES", Mdesde: '', MHasta: '', Intervalo: '', Tdesde: '', THasta: '', IntervaloT: '' },
      { Dias: "MARTES", Mdesde: '', MHasta: '', Intervalo: '', Tdesde: '', THasta: '', IntervaloT: '' },
      { Dias: "MIERCOLES", Mdesde: '', MHasta: '', Intervalo: '', Tdesde: '', THasta: '', IntervaloT: '' },
      { Dias: "JUEVES", Mdesde: '', MHasta: '', Intervalo: '', Tdesde: '', THasta: '', IntervaloT: '' },
      { Dias: "VIERNES", Mdesde: '', MHasta: '', Intervalo: '', Tdesde: '', THasta: '', IntervaloT: '' },
      { Dias: "SABADO", Mdesde: '', MHasta: '', Intervalo: '', Tdesde: '', THasta: '', IntervaloT: '' },
      { Dias: "DOMINGO", Mdesde: '', MHasta: '', Intervalo: '', Tdesde: '', THasta: '', IntervaloT: '' }
    ];
  
 
  
  

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton >
        <Modal.Title>Horarios profesional</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{width: '600px'}}
      >
        <div >
          <div >
            <div style={{display: 'flex'}}>
              <h6>
                Profesional: <input type="text" />
               
              </h6>

              
                <h6>
                  Profesión: <input type="text" />
                </h6>
              
            </div>
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

                 


                  
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td style={{ textAlign: "center" }}>{item.Dias}</td>
                    <td>{item.Mdesde}</td>
                    <td>{item.MHasta}</td>
                    <td style={{ textAlign: "center" }}>{item.Intervalo}</td>
                    <td>{item.Tdesde}</td>
                    <td>{item.THasta}</td>
                    <td style={{ textAlign: "center" }}>{item.IntervaloT}</td>
                   
                    
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer >
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default mdlhorarioprofesional;
