import react, { useState, useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";

const ContadoForm = ({
  
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


 useEffect(() => {

       setUltimosCuatrosNroTarjeta("0000");
       setFechaVto("9999");
       setTitularApeNom("NADA");
       setIDTarjeta(0);

       

    }, []);

  return (
    <>
      <h3 >PAGO EN EFECTIVO</h3>

      <hr />

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

export default ContadoForm;