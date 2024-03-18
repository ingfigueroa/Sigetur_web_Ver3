import Table from "react-bootstrap/Table";


function tablapizarradeturnos() {
  return (
    <Table className="table-bordered table table-sm table-primary text-center">
      <thead>
        <tr>
          <th key="0">Estado</th>

          <th key="1">Hora</th>

          <th key="2">Paciente</th>
          <th key="3">DNI</th>

          <th key="4">Obra social</th>

          <th key="5">Observaciones</th>
          <th key="6">Cobrado</th>

          <th key="7">Sobreturno</th>

          <th key="8">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Lib</td>
          <td>08:30</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td><i class="bi bi-download"></i>
          <i class="bi bi-pencil-square"></i></td>
        </tr>
        <tr>
          <td>Lib</td>
          <td>09:00</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Lib</td>
          <td>09:30</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>PRE-COB</td>
          <td>10:00</td>
          <td>FIGUEROA, FLORENCIA PAULA</td>
          <td>40662065</td>
          <td>PARTICULAR</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Lib</td>
          <td>10:30</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </Table>
  );
}

export default tablapizarradeturnos;
