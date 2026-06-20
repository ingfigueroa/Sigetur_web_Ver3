import { useContext, useState, useEffect } from "react";

import { AuthContext } from "../../context/AuthContext";
import { useLocation,  useNavigate } from "react-router-dom";

import { Form, Button, Container, Row, Col } from "react-bootstrap";

import {clientesServices} from "../../services/clientes.service";

import "/src/css/registrarconsultorio.css";
import AbrirMDLMensaje from "../modales/mdlMensaje";

const registrarclientepasotres = () => {

  const { setClientId, setUserId } = useContext(AuthContext);

  const navigate = useNavigate();

const [mensaje, setMensaje] = useState("");
    
  
     const [showMDLMensaje, setShowMDLMensaje] = useState("");

  const openMdlMensaje = () => {
    setShowMDLMensaje(true);
  };

  const closeMdlMensaje = () => {
    setShowMDLMensaje(false);
    
    
  };


  const [formData, setFormData] = useState({
    tipoCliente: "",
    razonSocial: "",
    email: "",
    cuil: "",
    celular: ""
  });

  const location = useLocation();
  const email = location.state?.email;
  


const handleReset = () => {
  setFormData({
    tipoCliente: "",
    razonSocial: "",
   
    cuil: "",
    celular: ""
  });
};

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 🚨 evita recarga de página

    try {
      // 👉 acá llamás a tu service

     
    
      const response = await clientesServices.CrearCliente(formData);

    

      setClientId(response.idcliente);
      setUserId(response.idusuario);

      setMensaje("El cliente se ha generado.\nSe envió un correo para actualizar la contraseña.");
      openMdlMensaje();

       setTimeout(() => {
        navigate("/login", {
          state: { email: email }
        });
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
  if (email) {
    setFormData(prev => ({
      ...prev,
      email: email
    }));
  }
}, [email]);

  return (
    <>
    <div className="fondoprincipal">
    
       <div style={{
            width: "100%",
            height: "65px",
            backgroundColor: "#1565c0",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            color: "white",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1000
          }}>
        <a href="/">
          <img 
            src="./assets/Logo_2022_resolucion.jpg" 
            alt="" 
            style={{ height: "30px", marginBottom: "20px" }}
          />
        </a>

        <h3 style={{ margin: 0, marginLeft: "15px", fontWeight: "400" }}>
        Sistema de Gestión de Turnos para profesionales de la salud</h3>
      </div>

  {/* CONTENIDO CENTRADO */}
  <div style={{
    flex: 1,
    display: "flex",
    justifyContent: "center",
    
    padding: "5px"
  }}>

    {/* CARD */}
    <div style={{
      width: "100%",
      maxWidth: "700px",
      background: "white",
      borderRadius: "12px",
      padding: "30px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
    }}>

      <h1 style={{ 
        marginBottom: "25px",
        color: "#0277bd",
        fontFamily: "Roboto",
        fontSize: "30px"
      }}>
        Registrar CONSULTORIO - Paso 3
      </h1>

      <Form onSubmit={handleSubmit}>
        <Row>

      <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                
                readOnly
              />
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de Cliente</Form.Label>
              <Form.Select
                name="tipoCliente"
                value={formData.tipoCliente}
                onChange={handleChange}
              >
                <option value="">Seleccione...</option>
                <option value="CONSULTORIO">CONSULTORIO</option>
                <option value="CLINICA">CLINICA</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Razón Social</Form.Label>
              <Form.Control
                type="text"
                name="razonSocial"
                value={formData.razonSocial}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

         

        {/*   <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>CUIL</Form.Label>
              <Form.Control
                type="text"
                name="cuil"
                value={formData.cuil}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Celular</Form.Label>
              <Form.Control
                type="text"
                name="celular"
                value={formData.celular}
                onChange={handleChange}
              />
            </Form.Group>
          </Col> */}

        </Row>

        <div style={{ textAlign: "right", marginTop: "20px", padding:"10px" }}>
          <Button variant="success" type="submit"
          style={{margin:"10px" }}>
              Registrar CONSULTORIO
          </Button>
          
           <Button variant="secondary" type="button" onClick={handleReset}
           style={{margin:"10px" }}
           >
              Limpiar
        </Button>

        </div>
        

      </Form>

    </div>
  </div>
</div>
 {showMDLMensaje && (
            <AbrirMDLMensaje
              show={openMdlMensaje}
              handleClose={closeMdlMensaje}
              modalMessage={mensaje}
            />
          )}

    </>
  );
};


export default registrarclientepasotres;
