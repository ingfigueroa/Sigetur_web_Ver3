import { useContext, useState, useEffect } from "react";

import { AuthContext } from "../../context/AuthContext";
import { useLocation,  useNavigate } from "react-router-dom";

import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";


import {clientesServices} from "../../services/clientes.service";
import { provinciasService } from "/src/services/provincias.service.js";
import { localidadesService } from "/src/services/localidades.service.js";

import "/src/css/registrarconsultorio.css";
import AbrirMDLMensaje from "../modales/mdlMensaje";

const registrarclientepasotres = () => {

  const { setClientId, setUserId } = useContext(AuthContext);

  const navigate = useNavigate();

const [mensaje, setMensaje] = useState("");

  const [provincias, setProvincias] = useState([]);
  const [localidades, setLocalidades] = useState([]);

    const [idprovincia, setIDProvincia] = useState(0);
    const [idlocalidad, setIDLocalidad] = useState(0);
    
  
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
    celular: "",
    idprovincia: "",
    idlocalidad: ""

  });

  const location = useLocation();
  const email = location.state?.email;
  
  const cargarLocalidades = async (idprovincia) => {

  try {

 if (idprovincia > 0) {
     
    const response = await localidadesService.Buscar(idprovincia);
    
    setLocalidades(response);

    }
  } catch (error) {
    //console.error("Error al cargar localidades:", error);
    setLocalidades([]);
  }
};

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

const volveallogin = async () => {
   setTimeout(() => {
              navigate("/login", {
                
              });
            }, 500);
};

  const handleSubmit = async (e) => {
    e.preventDefault(); // 🚨 evita recarga de página

    try {
      // 👉 acá llamás a tu service
      const response = await clientesServices.CrearCliente(formData, idprovincia, idlocalidad);
      setClientId(response.idcliente);
      setUserId(response.idusuario);

      setMensaje("El cliente se ha generado.\nSe envió un correo para actualizar la contraseña.");
      openMdlMensaje();

       setTimeout(() => {
        navigate("/login", {
          state: { email: email }
        });
      }, 5000);
    } catch (error) {
      setMensaje(error);
      openMdlMensaje();
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


  useEffect(() => {
    async function fetchData() {
      try {
        const data = await provinciasService.Buscar(); // Llama a la función asíncrona
        
        setProvincias(data); // Establece el estado con los datos obtenidos
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData(); // Ejecuta la función para obtener los datos
  }, []);


return (
  <>
    <div className="fondoprincipal">

      {/* ENCABEZADO */}
      <header
        style={{
          width: "100%",
          height: "65px",
          backgroundColor: "#1565c0",
          display: "flex",
          alignItems: "center",
          padding: "0 10px",
          color: "white",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000
        }}
      >
        <a href="/">
          <img
            src="./assets/Logo_2022_resolucion.jpg"
            alt="Logo SIGETUR"
            style={{ height: "30px", marginBottom: "20px" }}
          />
        </a>

        <h3
          style={{
            margin: "10px 0 10px 15px",
            fontWeight: "400",
            color: "white"
          }}
        >
          Sistema de Gestión de Turnos para profesionales de la salud
        </h3>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "35px 5px 5px"
        }}
      >
        <section
          style={{
            width: "100%",
            maxWidth: "700px",
            background: "white",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
          }}
        >
          <h1
            style={{
              marginTop: "25px",
              marginBottom: "25px",
              color: "#0277bd",
              fontFamily: "Roboto",
              fontSize: "30px"
            }}
          >
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
                    <option value="CONSULTORIO">MI CONSULTORIO</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Razón Social</Form.Label>
                  <Form.Control
                    type="text"
                    name="razonSocial"
                    value={formData.razonSocial.toUpperCase()}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <InputGroup className="mb-3">
                  <InputGroup.Text
                    style={{
                      backgroundColor: "#679bb9",
                      color: "white",
                      width: "30%"
                    }}
                  >
                    Provincia que reside
                  </InputGroup.Text>

                  <Form.Select
                    style={{ width: "70%" }}
                    value={idprovincia}
                    onChange={(e) => {
                      const idProv = e.target.value;

                      setIDProvincia(idProv);
                      setIDLocalidad("");
                      setLocalidades([]);

                      cargarLocalidades(idProv);
                    }}
                  >
                    <option value="">Seleccionar</option>

                    {provincias.map((prov) => (
                      <option key={prov.ID} value={prov.ID}>
                        {prov.Nombre}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </Col>

              <Col md={12}>
                <InputGroup className="mb-3">
                  <InputGroup.Text
                    style={{
                      backgroundColor: "#679bb9",
                      color: "white",
                      width: "30%"
                    }}
                  >
                    Localidad que reside
                  </InputGroup.Text>

                  <Form.Select
                    style={{ width: "70%" }}
                    value={idlocalidad}
                    disabled={!idprovincia}
                    onChange={(e) => setIDLocalidad(e.target.value)}
                  >
                    <option value="">Seleccionar</option>

                    {localidades.map((localidad) => (
                      <option key={localidad.ID} value={localidad.ID}>
                        {localidad.localidad}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </Col>
            </Row>

            <footer
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "5px",
                
              }}
            >
               <div className="volverallogin">
                        
                      
                        <div className="volverallogin1">
                           <Button onClick={volveallogin}>Volver al LOGIN</Button>
                          
                          
                        </div>
              
                         <div className="volverallogin1">
                          <Button variant="outline-success" type="submit">Registrar CONSULTORIO</Button>
                          
                        </div>
                      
                      </div>
            {/*  <Button variant="outline-success" type="submit">
                Registrar CONSULTORIO
              </Button>

              <Button
                variant="secondary"
                type="button"
                onClick={handleReset}
              >
                Limpiar
              </Button> */}

            </footer>
          </Form>
        </section>
      </main>
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
