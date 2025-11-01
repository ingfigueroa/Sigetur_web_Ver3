import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import Modal from "react-bootstrap/Modal";

const hcodontologia = ({ show, handleClose }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#0277bd", color: "white" }}
        >
          <Modal.Title>HISTORIA CLINICA - PACIENTE: </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ width: "100%", background: "white" }}>
          <div style={{ width: "90%", textAlign: "left" }}>
            <Tabs
              defaultActiveKey="profile"
              id="fill-tab-example"
              className="mb-3"
              fill
            >
              <Tab eventKey="home" title="Ana                                                                                                    mmesis">
                Tab content for Home
              </Tab>
              <Tab eventKey="profile" title="Exploración">
                Tab content for Profile
              </Tab>
              <Tab eventKey="longer-tab" title="Diagnostico">
                Tab content for Loooonger Tab
              </Tab>
              <Tab eventKey="contact" title="Plan de tratamiento" >
                Tab content for Contact
              </Tab>
            </Tabs>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default hcodontologia;
