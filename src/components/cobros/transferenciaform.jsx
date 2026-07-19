import react, { useState, useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";

import { formatearFecha} from "../utils/fecha";

const TransferenciaForm = ({
      observaciones,
  setObservaciones,
   ultimosCuatrosNroTarjeta,
   setUltimosCuatrosNroTarjeta,
    fechaVto,
   setFechaVto,
   titularApeNom,
   setTitularApeNom,
   idtarjeta,
   setIDTarjeta
}) => {

 const [fecha, setFecha] = useState(
    new Date().toISOString().split("T")[0]
);
  const [banco, setBanco] = useState("")
  const [ultimosCuatros, setUltimosCuatros] = useState("");


  const [nombresApellido, setNombresApellido] = useState("");

   useEffect(() => {
         
          setTitularApeNom("")
          setUltimosCuatrosNroTarjeta("")
          setFechaVto("9999")
          setIDTarjeta(0)
         
          
        
      }, []);

  return (
    <>
     <h3 >TRANSFERENCIA</h3>
     <hr />
     <InputGroup className="mb-3" size="sm">
         {/*  <InputGroup.Text style={{ backgroundColor: "#052e46", color: "white", fontSize: "14px"}}>
              Fecha:
          </InputGroup.Text>
          <Form.Control
          style={{ marginRight: "16px" }}
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        /> */}
         <InputGroup.Text style={{ backgroundColor: "#052e46", color: "white", fontSize: "14px" }}>
              Últimos 4 digítos de la Operación
          </InputGroup.Text>
          <Form.Control
              type="text"
               style={{ backgroundColor: "#f1f3f5", width: "20%", marginRight:"50px", maxWidth: "150px" }}
              inputMode="numeric"
              maxLength={4}
              value={ultimosCuatrosNroTarjeta}
              onChange={(e) => {
                  const valor = e.target.value.replace(/\D/g, "");
                  setUltimosCuatrosNroTarjeta(valor);
              }}
        />
        
     </InputGroup>
     <InputGroup className="mb-3" >
             
           
              <InputGroup.Text
                                 style={{ backgroundColor: "#052e46", color: "white",  fontSize: "14px", maxWidth: "220px"  }}
                               >Apellido y Nombres del Titular
             </InputGroup.Text>
             <Form.Control
                                 style={{ backgroundColor: "#f1f3f5", color: "black"  }}
                                 aria-label="Ingresar nombres y apellido"
                                 aria-describedby="basic-addon2"
                                 type="text"
                                
                                 /*  onChange={(e) =>setPrestacion(e.target.value.toUpperCase())}*/
                                value={titularApeNom}
                                 onChange={(e) => setTitularApeNom(e.target.value.toUpperCase())}
                               />
            
           </InputGroup>

            <Form.Group className="mb-3">
                 <InputGroup.Text style={{ backgroundColor: "#052e46", color: "white" }}>
                         Observaciones
                     </InputGroup.Text>
           
                  
           
                   <Form.Control
                     as="textarea"
                     rows={1}
                     value={observaciones}
                     onChange={(e) => setObservaciones(e.target.value.toUpperCase())}
                     placeholder="Ingrese una observación..."
                   />
                 </Form.Group>

    
     
    

     

      
    </>
  );
};

export default TransferenciaForm;