import Table from "react-bootstrap/Table";

import "../css/tablapizaturnos.css";

function tablapizarradeturnos() {
  const data = [
    { Estado: "LIB", Hora: '08:30', Paciente: "", DNI: "", Obra_social: "" },
    { Estado: "LIB", Hora: "09:00", Paciente: "", DNI: "", Obra_social: "" },
    { Estado: "LIB", Hora: "09:30", Paciente: "", DNI: "", Obra_social: "" },
    { Estado: "PRE-COB", Hora: "10:00", Paciente: "FIGUEROA, FLORENCIA PAULA", DNI: 40662065, Obra_social:"PARTICULAR" },
    { Estado: "LIB", Hora: "10:30", Paciente: "", DNI: "", Obra_social: "" },
    { Estado: "LIB", Hora: "11:00", Paciente: "", DNI: "", Obra_social: "" },
    { Estado: "LIB", Hora: '08:30', Paciente: "", DNI: "", Obra_social: "" },
    { Estado: "LIB", Hora: "09:00", Paciente: "", DNI: "", Obra_social: "" },
    { Estado: "LIB", Hora: "09:30", Paciente: "", DNI: "", Obra_social: "" },
    { Estado: "COB", Hora: "10:00", Paciente: "FIGUEROA, CAROLINA", DNI: 40662065, Obra_social:"DASPU" },
    { Estado: "LIB", Hora: "10:30", Paciente: "", DNI: "", Obra_social: "" },
    { Estado: "LIB", Hora: "11:00", Paciente: "", DNI: "", Obra_social: "" },
    
  ];

  return (
    
   
    <div>
      <div className="acomodartabla">
        
        <Table className="table">
          <thead>
            <tr className="personalizarfila h-50">
              <th style={{textAlign: 'center'}} key="0">Estado</th>

              <th key="1">Hora</th>

              <th key="2">Paciente</th>
              <th style={{textAlign: 'center'}} key="3">DNI</th>

              <th key="4">Obra social</th>

              <th style={{textAlign: 'center'}} key="6">Cobrado</th>

              <th style={{textAlign: 'center'}} key="7">Sobreturno</th>

              <th style={{textAlign: 'center'}} key="8">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id} className={item.age > 30 ? 'highlighted-row' : ''}>
                <td style={{textAlign: 'center'}}>{item.Estado}</td>
                <td>{item.Hora}</td>
                <td>{item.Paciente}</td>
                <td style={{textAlign: 'center'}}>{item.DNI}</td>
                <td >{item.Obra_social}</td>
                <td style={{textAlign: 'center'}}>
                  <button className="btn btn-sm btn-danger">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </td>
                <td style={{textAlign: 'center'}}>
                  <button className="btn btn-sm btn-info">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </td>
                <td style={{textAlign: 'center'}}>
                  <button className="btn btn-sm btn-primary">
                    <i class="fa-solid fa-pencil"></i>
                  </button>
                  <button className="btn btn-sm btn-danger">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                  <button className="btn btn-sm btn-success">
                    <i class="fa-solid fa-file-invoice-dollar"></i>
                  </button>
                </td>
              </tr>
            ))}
        
            
          </tbody>
        </Table>
      </div>
    </div>
    
    
  );
}

export default tablapizarradeturnos;
