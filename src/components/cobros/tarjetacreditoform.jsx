import React, { useState, useEffect } from "react";
import { Form, DropdownButton, Dropdown, InputGroup } from "react-bootstrap";
import { mediosdepagosService } from "/src/services/mediosdepagos.service";

const TarjetaCredito = ({
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

    const [tarjetasDeCredito, setTarjetasDeCredito] = useState([]);
    const [tarjetaSeleccionada, setTarjetaSeleccionada] = useState(null);

       const handleFechaVto = (e) => {
            const valor = e.target.value.replace(/\D/g, "").substring(0, 4);
            setFechaVto(valor);
        };

    function BuscarTarjetasdeCredito() {
        mediosdepagosService
            .getBuscarTarjetas("CREDITO")
            .then((data) => {
                setTarjetasDeCredito(data);

                // Selecciona automáticamente la primera tarjeta
                if (data.length > 0) {
                    setTarjetaSeleccionada(data[0]);
                    setIDTarjeta(data[0].ID);
                }
            })
            .catch((error) => console.error("Error fetching data:", error));
    }

    const seleccionarTarjeta = (id) => {
        const tarjeta = tarjetasDeCredito.find(
            (t) => t.ID === Number(id)
        );

        if (!tarjeta) return;

        setTarjetaSeleccionada(tarjeta);
        setIDTarjeta(tarjeta.ID);
    };

    useEffect(() => {

        setFechaVto("");
        setTitularApeNom("");
        setUltimosCuatrosNroTarjeta("");

        BuscarTarjetasdeCredito();

    }, []);

    return (
        <>
            <h3>TARJETA DE CREDITO</h3>
            <hr />

            <InputGroup className="mb-3">
                <InputGroup.Text
                    style={{
                        backgroundColor: "#052e46",
                        color: "white",
                        fontSize: "14px",
                        marginRight: "10px",
                        maxWidth: "220px",
                    }}
                >
                    Elija la tarjeta
                </InputGroup.Text>

                <DropdownButton
    id="dropdown-basic-button"
    variant="light"
    title={tarjetaSeleccionada?.Nombre || "Tarjeta de crédito"}
    onSelect={seleccionarTarjeta}
>
                    {tarjetasDeCredito.length > 0 ? (
                        tarjetasDeCredito.map((tarjeta) => (
                            <Dropdown.Item
                                key={tarjeta.ID}
                                eventKey={tarjeta.ID}
                            >
                                {tarjeta.Nombre}
                            </Dropdown.Item>
                        ))
                    ) : (
                        <Dropdown.Item disabled>
                            No hay tarjetas de crédito definidas
                        </Dropdown.Item>
                    )}
                </DropdownButton>
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Text
                    style={{
                        backgroundColor: "#052e46",
                        color: "white",
                        fontSize: "14px",
                        maxWidth: "320px",
                    }}
                >
                    Últimos cuatro dígitos de la Tarjeta
                </InputGroup.Text>

                <Form.Control
                    style={{
                        backgroundColor: "#f1f3f5",
                        width: "20%",
                        marginRight: "50px",
                        maxWidth: "150px",
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    value={ultimosCuatrosNroTarjeta}
                    onChange={(e) => {
                        const valor = e.target.value.replace(/\D/g, "");
                        setUltimosCuatrosNroTarjeta(valor);
                    }}
                />

                <InputGroup.Text
                    style={{
                        backgroundColor: "#052e46",
                        color: "white",
                        fontSize: "14px",
                        maxWidth: "100px",
                    }}
                >
                    Fecha de Vto
                </InputGroup.Text>

                <Form.Control
                    style={{
                        backgroundColor: "#f1f3f5",
                        color: "black",
                        maxWidth: "100px",
                    }}
                    type="text"
                    placeholder="MM/AA"
                    maxLength={5}
    
                    value={
                        fechaVto.length > 2
                            ? fechaVto.substring(0, 2) + "/" + fechaVto.substring(2)
                            : fechaVto
                    }
                    onChange={handleFechaVto}
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Text
                    style={{
                        backgroundColor: "#052e46",
                        color: "white",
                        fontSize: "14px",
                        maxWidth: "220px",
                    }}
                >
                    Apellido y Nombres del Titular
                </InputGroup.Text>

                <Form.Control
                    style={{
                        backgroundColor: "#f1f3f5",
                        color: "black",
                    }}
                    value={titularApeNom}
                    onChange={(e) =>
                        setTitularApeNom(e.target.value.toUpperCase())
                    }
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

export default TarjetaCredito;