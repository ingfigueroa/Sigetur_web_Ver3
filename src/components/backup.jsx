<div style={{ width: "100%",  backgroundColor:"white", paddingLeft: '5px', paddingRight:'5px'   }}>
          <h4 style={{ width: "100%", backgroundColor:"#D6EAF8", textAlign:"center"}}>Domicilio del profesional</h4>
          

            <InputGroup className="mb-3">
            <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                País
              </InputGroup.Text>
              <select style={{ width: '25%' }}>
              <option value="">Seleccione un país</option>
                <option value="someOption">ARGENTINA</option>
               
              </select>
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Provincia
              </InputGroup.Text>
              <select onChange={handleProvinciaChange} style={{ width: '25%' }}>
              <option value="">Seleccione una provincia</option>
              {provincias.map(provincias => (
                <option key={provincias.ID} value={provincias.ID}>
                    {provincias.Nombre}
                </option>
            ))}
              </select>
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white"}}
              >
                Localidad
              </InputGroup.Text>
              <select style={{ width: '25%' }}>
                <option value="">Seleccione una localidad</option>
                {localidades.map(localidad => (
                    <option key={localidad.ID} value={localidad.ID}>
                        {localidad.Nombre}
                    </option>
                ))}
            </select>
            
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Calle
              </InputGroup.Text>
              <Form.Control
                placeholder="Ingresar calle"
                aria-label="Ingresar calle"
                aria-describedby="basic-addon2"
                type="text"
                
              />
             
           
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Número
              </InputGroup.Text>
              <Form.Control
                placeholder="Ingresar número"
                aria-label="Ingresar número"
                aria-describedby="basic-addon2"
                type="text"
              />
            </InputGroup>
           
        </div>

        
