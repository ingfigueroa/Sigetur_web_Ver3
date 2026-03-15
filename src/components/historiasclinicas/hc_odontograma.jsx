import { useState, useEffect } from "react";

import { Form, Row, Col, Button } from "react-bootstrap";

import Diente from "./hc_diente_cuadrado";

import { historiaclinicaService } from "../../services/historiaclinica.service";

const Odontograma = ({ data, setData, modo, idhc, idprofesional }) => {
  const [cantidadExistentes, setCantidadExistentes] = useState(0);

  const [situacionDentaria, setSituacionDentaria] = useState([]);
  const [situacionSeleccionada, setSituacionSeleccionada] = useState("");

  const [colorSeleccionado, setColorSeleccionado] = useState("#ffffff");
  const [descripcionSeleccionada, setDescripcionSeleccionada] = useState("");
  const [observacionesSeleccionadas, setObservacionesSeleccionadas] =
    useState("");

  const [idUsuario, setIDUsuario] = useState("2");

  function getCara(prev, caraBuscada) {
  return Object.values(prev)
    .flatMap(p => Object.entries(p.caras || {}))
    .find(([nombre]) => nombre === caraBuscada)?.[1];
}
function getIdPieza(prev, piezaBuscada) {
  const pieza = prev[piezaBuscada];
  if (!pieza) return null;

  const primeraCara = Object.values(pieza.caras || {})[0];
  return primeraCara?.idpieza ?? null;
}

  const handleChangeSituacion = (e) => {
    const id = e.target.value;

    const situacion = situacionDentaria.find(
      (s) => Number(s.idsitudentaria) === Number(id),
    );

    console.log(situacion)
    setSituacionSeleccionada(situacion); // 👈 guardas el objeto completo
  };

  const handleActualizar = (pieza, cara, tipoSeleccionado) => {
 

    if (!tipoSeleccionado) {
      console.warn("No hay tipoSeleccionado");
      return;
    }
    const caraNormalizada = cara.toLowerCase();

    setData((prev) => {
      // buscar idcara en el estado actual
      
      

      const cara = getCara(prev, caraNormalizada);
      const idcara = cara?.idcara;
      console.log(idcara)
      const idpieza = getIdPieza(prev, pieza);
     
      
      /* Object.values(prev).some((piezaData) => {
        const caraEncontrada = Object.entries(piezaData.caras || {}).find(
          ([nombreCara]) => nombreCara === caraNormalizada,
        );

        if (caraEncontrada) {
          idcara = caraEncontrada[1].idcara;
          return true; // corta la búsqueda
        }

        return false;
      }); */

      const nuevoEstado = {
        ...prev,
        
        [pieza]: {
          ...(prev[pieza] || {}),
          caras: {
            ...(prev[pieza]?.caras || {}),
            [caraNormalizada]: {
              idpieza: idpieza,
              idcara: idcara,
              idsituaciondentaria: tipoSeleccionado.idsitudentaria,
              situacion: tipoSeleccionado.situaciondentaria,
              color: tipoSeleccionado.color,
              observacion: tipoSeleccionado.observaciones,
            },
          },
        },
      };
      

      return nuevoEstado;
    });
  };

  // ===== PERMANENTES =====
  const supDerecha = [18, 17, 16, 15, 14, 13, 12, 11];
  const supIzquierda = [21, 22, 23, 24, 25, 26, 27, 28];
  const infDerecha = [48, 47, 46, 45, 44, 43, 42, 41];
  const infIzquierda = [31, 32, 33, 34, 35, 36, 37, 38];

  // ===== TEMPORALES =====
  const tempSupDerecha = [55, 54, 53, 52, 51];
  const tempSupIzquierda = [61, 62, 63, 64, 65];
  const tempInfDerecha = [85, 84, 83, 82, 81];
  const tempInfIzquierda = [71, 72, 73, 74, 75];

  async function BuscarSituaciondentaria() {
    try {
      const data = await historiaclinicaService.getHCSituacionDentaria();

      setSituacionDentaria(data[0]);
    } catch (error) {
      console.error("Error al buscar situación dentaria:", error);
    }
  }

  const renderFilaPermanentes = (piezas, y) =>
    piezas.map((pieza, index) => (
      <g key={pieza} transform={`translate(${index * 55}, ${y})`}>
        
        <Diente
          pieza={pieza}
          data={data[pieza]}
          modo={modo}
          tipoSeleccionado={situacionSeleccionada}
          onActualizar={handleActualizar}
        />
      </g>
    ));

  const renderFilaTemporalesDerecha = (piezas, y) =>
    piezas.map((pieza, index) => (
      <g
        key={`${pieza}-${JSON.stringify(data[pieza])}`}
        transform={`translate(${index * 55}, ${y})`}
      >
        <Diente
          pieza={pieza}
          data={data?.[pieza] || { caras: {} }}
          modo="realizado"
          tipoSeleccionado={situacionSeleccionada}
          onActualizar={handleActualizar}
        />
      </g>
    ));

  const renderFilaTemporales = (piezas, y) =>
    piezas.map((pieza, index) => (
      <g key={pieza} transform={`translate(${165 + index * 55}, ${y})`}>
        <Diente
          pieza={pieza}
          data={data?.[pieza] || { caras: {} }}
          modo="realizado"
          tipoSeleccionado={situacionSeleccionada}
          onActualizar={handleActualizar}
        />
      </g>
    ));

  const generarPayloadOdontograma = () => {
    const resultado = [];

    Object.entries(data).forEach(([pieza, piezaData]) => {
      Object.entries(piezaData.caras).forEach(([cara, caraData]) => {
        resultado.push({
          idhc: idhc,
          idpieza: parseInt(caraData.idpieza),
          idcara: parseInt(caraData.idcara),
          idsituaciondentaria: caraData.idsituaciondentaria,
          idprofesional: idprofesional,
          observaciones: caraData.observacion ?? null,
          idusuario: idUsuario,
        });
      });
    });
    
    return resultado;
  };

  async function grabarfotoodontograma() {
    try {
      const payload = generarPayloadOdontograma();

   
      if (!payload.length) {
        alert("No hay cambios para guardar");
        return;
      }

  
      await historiaclinicaService.GrabarFotoOdontograma(payload);

      setModalMessage("ALTA EXITOSA");

    } catch (error) {
      console.error("Error al guardar odontograma:", error);
      alert("Error al guardar odontograma");
    }
  }

  useEffect(() => {
    BuscarSituaciondentaria();
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gap: "10px",
        marginTop: "10px",
        marginLeft: "10px",
      }}
    >
      <div
        style={{
          width: "100%",

          height: "fit-content",
          marginTop: "5px",
        }}
      >
        <Row>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="success"
              style={{
                height: "24px", // más alto
                fontSize: "8px", // texto más grande
                padding: "0px 20px", // más espacio interno
                whiteSpace: "nowrap",
              }}
              onClick={(event) => {
                grabarfotoodontograma();
                event.preventDefault();
              }}
            >
              GRABAR - ODONTOGRAMA
            </Button>
          </div>
        </Row>
        <hr />
        <Row className="mt-2">
          <Col md={2}>
            <Form.Control value={situacionSeleccionada.situacion} readOnly />
          </Col>
          <Col md={4}>
            <Form.Select
              value={situacionSeleccionada?.idsitudentaria || ""}
              onChange={handleChangeSituacion}
            >
              <option value="">Seleccione...</option>

              {situacionDentaria.map((item) => (
                <option key={item.idsitudentaria} value={item.idsitudentaria}>
                  {item.situaciondentaria}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Control
              value={situacionSeleccionada.observaciones}
              readOnly
            />
          </Col>
          <Col md={2} className="d-flex">
            <span
              style={{
                ...cuadro(situacionSeleccionada.color),
                height: "100%",
                width: "70%",
                display: "block",
              }}
            />
          </Col>
        </Row>

        {/*   <h4>REFERENCIAS</h4>

        <p style= {{fontSize:"12px"}} >
          <span style={cuadro("#dc3545")} /> COLOR ROJO Prestaciones existentes
        </p>
        <p style= {{fontSize:"12px"}}>
          <span style={cuadro("#0d6efd")} /> COLOR AZUL Prestaciones requeridas
        </p>
        <p style= {{fontSize:"12px"}}>
          <span style={cuadro("#198754")} /> COLOR VERDE Prestaciones realizadas
        </p>
        <p style= {{fontSize:"12px"}} >X Diente ausente o se tiene que extraer</p>
        <p style= {{fontSize:"12px"}}>▭ Protesis fija</p>
        <p style= {{fontSize:"12px"}}>▭ Protesis removible</p>
        <p style= {{fontSize:"12px"}}>◯ Coronas</p>

        <div style={{ marginTop: "40px" }}>
          <Form.Group>
            <Form.Label>CANTIDAD DE DIENTES EXISTENTES</Form.Label>

            <Form.Control
              type="number"
              value={cantidadExistentes}
              onChange={(e) => setCantidadExistentes(e.target.value)}
              style={{
                border: "1px solid black",
                borderRadius: "0px",
              }}
            />
          </Form.Group>
        </div> */}
      </div>

      {/* ODONTOGRAMA */}
      <div
        style={{
          display: "flex",
          justifyContent: "center", // centra horizontal
          alignItems: "center", // centra vertical
          height: "100vh", // ocupa toda la pantalla
        }}
      >
        <div style={{}}>
          <svg width="900" height="500">
            {/* PERMANENTES SUPERIOR */}
            {renderFilaPermanentes(supDerecha, 30)}
            {renderFilaPermanentes(supIzquierda, 30).map((el, i) => (
              <g key={i} transform="translate(450,0)">
                {el}
              </g>
            ))}

            {/* PERMANENTES INFERIOR */}
            {renderFilaPermanentes(infDerecha, 110)}
            {renderFilaPermanentes(infIzquierda, 110).map((el, i) => (
              <g key={i} transform="translate(450,0)">
                {el}
              </g>
            ))}

            {/* Línea divisoria */}
            <line
              x1="0"
              y1="95"
              x2="870"
              y2="95"
              stroke="black"
              strokeWidth="2.5"
            />
            <line
              x1="435"
              y1="0"
              x2="435"
              y2="300"
              stroke="black"
              strokeWidth="2.5"
            />

            {/* TEMPORALES SUPERIOR */}
            {renderFilaTemporales(tempSupDerecha, 260)}
            {renderFilaTemporalesDerecha(tempSupIzquierda, 260).map((el, i) => (
              <g key={i} transform="translate(450,0)">
                {el}
              </g>
            ))}

            {/* TEMPORALES INFERIOR */}
            {renderFilaTemporales(tempInfDerecha, 340)}
            {renderFilaTemporalesDerecha(tempInfIzquierda, 340).map((el, i) => (
              <g key={i} transform="translate(450,0)">
                {el}
              </g>
            ))}

            {/* Línea divisoria temporales */}
            {/*eje X*/}
            <line
              x1="160"
              y1="325"
              x2="720"
              y2="325"
              stroke="black"
              strokeWidth="2.5"
            />
            {/*eje y*/}
            <line
              x1="435"
              y1="300"
              x2="435"
              y2="450"
              stroke="black"
              strokeWidth="2.5"
            />
          </svg>
          <h6>TEMPORALES</h6>
        </div>
      </div>

      {/* REFERENCIAS */}
    </div>
  );
};

const cuadro = (color) => ({
  display: "inline-block",
  width: "18px",
  height: "18px",
  backgroundColor: color,
  border: "1px solid black",
  marginRight: "8px",
});

export default Odontograma;
