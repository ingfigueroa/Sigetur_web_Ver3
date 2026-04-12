import React from "react";
  import { Card } from "react-bootstrap";
  import Table from "react-bootstrap/Table";


function PlanTratamiento({ data, setData }) {
/* 
const handleChange = (index, field, value) => {
  setData((prevData) =>
    prevData.map((fila, i) =>
      i === index
        ? { ...fila, [field]: value }
        : fila
    )
  );
}; */


/* 
const agregarFila = () => {
  setData([
    ...data,
    {
      id: crypto.randomUUID(),
      codigo: "",
      prestacion: "",
      pieza: "",
      observaciones: ""
    }
  ]);
};


  const eliminarFila = (index) => {
    const nuevoPlan = data.filter((_, i) => i !== index);
    setData(nuevoPlan.length ? nuevoPlan : data);
  };
 */
  return (
    <Card>
     <Card.Body style={{ backgroundColor: "#e1f5fe" }}>
        
   <div className="">
          <Table bordered hover>
            <thead>
              <tr className="personalizarfila h-50">
                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                >
                  ID
                </th>
                <th
                  style={{
                    textAlign: "left",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                >
                  Apellido
                </th>

                <th
                  style={{
                    textAlign: "left",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                >
                  Nombres
                </th>

                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                >
                  DNI
                </th>

                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                    width: "15%",
                  }}
                >
                  EMail
                </th>
                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                    width: "15%",
                  }}
                >
                  Celular
                </th>
                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                >
                  Estado
                </th>

                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
          
                  <tr >
                    <td style={{ textAlign: "center" }}>fila 1</td>
                    <td style={{ textAlign: "left", fontSize: "12px" }}>
                      fila 2
                    </td>
                    <td style={{ textAlign: "left", fontSize: "12px" }}>
                      fila 3
                    </td>

                    <td style={{ textAlign: "center", fontSize: "12px" }}>
                      fila 4
                    </td>
                    <td style={{ textAlign: "center", fontSize: "12px" }}>
                      fila 5
                    </td>
                    <td style={{ textAlign: "center", fontSize: "12px" }}>
                     fila 6
                    </td>
                    <td style={{ textAlign: "center", fontSize: "12px" }}>
                      
                          pasivo
                      
                      
                    </td>
                   {/*  */}
                  </tr>
                 
               
            </tbody>
          </Table>
        </div>

       {/*  <Button size="sm" onClick={agregarFila}>
          + Agregar prestación
        </Button> */}
      </Card.Body>
    </Card>
  );
}

export default PlanTratamiento;
