import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';

const mdllistarprofesionales = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#0277bd", color: "white" }}
      >
        <Modal.Title>Horarios profesional</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ width: "600px" }}>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">RB</th>
              <th scope="col">Apellido</th>
              <th scope="col">Nombres</th>
              <th scope="col">Profesión</th>
              <th scope="col">Matricula</th>
              <th scope="col">Celular</th>
              <th scope="col">EMail</th>
              <th scope="col">Activo</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
              <Form.Check type="radio" aria-label="radio 1" />
              </td>

              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
             
              <td>
                <Form>
                  <Form.Check // prettier-ignore
                    type="switch"
                    id="custom-switch"
                
                  />
                  
                </Form>
              </td>
              <td style={{ textAlign: "center" }}>
                   
                    <button
                      title="Detalle del turno"
                      className="btn btn-sm btn-light btn-success"
                     
                    >
                      <i class="fa-solid fa-file-invoice-dollar"></i>
                    </button>
                    <button
                      title="Registrar cobro"
                      className="btn btn-sm btn-light btn-success"
                      variant="outline-secondary"
                     
                    >
                      <i class="fa-solid fa-dollar-sign"></i>
                    </button>
                  </td>
            </tr>
            <tr>
              <td>
              <Form.Check type="radio" aria-label="radio 1" />
              </td>

              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              
              <td>
              <Form>
                  <Form.Check // prettier-ignore
                    type="switch"
                    id="custom-switch"
                    
                  />
                  
                </Form>
              </td>
              <td style={{ textAlign: "center" }}>
                   
                    <button
                      title="Detalle del turno"
                      className="btn btn-sm btn-light btn-success"
                     
                    >
                      <i class="fa-solid fa-file-invoice-dollar"></i>
                    </button>
                    <button
                      title="Registrar cobro"
                      className="btn btn-sm btn-light btn-success"
                      variant="outline-secondary"
                     
                    >
                      <i class="fa-solid fa-dollar-sign"></i>
                    </button>
                  </td>
            </tr>
            <tr>
              <td>
              <Form.Check type="radio" aria-label="radio 1" />
              </td>

              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
             
              <td>
              <Form>
                  <Form.Check // prettier-ignore
                    type="switch"
                    id="custom-switch"
                   
                  />
                  
                </Form>
              </td>
              <td style={{ textAlign: "center" }}>
                   
                    <button
                      title="Detalle del turno"
                      className="btn btn-sm btn-light btn-success"
                     
                    >
                      <i class="fa-solid fa-file-invoice-dollar"></i>
                    </button>
                    <button
                      title="Registrar cobro"
                      className="btn btn-sm btn-light btn-success"
                      variant="outline-secondary"
                     
                    >
                      <i class="fa-solid fa-dollar-sign"></i>
                    </button>
                  </td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default mdllistarprofesionales;
