import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";
//import { Card, Button } from "antd";

//import Button from "react-bootstrap/Button";
import { DatePicker, Select } from "antd"; 
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

import dayjs from "dayjs";

function DashboardTurnos() {

  const [fechaDesde, setFechaDesde] = useState(dayjs().startOf("month"));
  const [fechaHasta, setFechaHasta] = useState(dayjs().endOf("month"));
  const [idProfesional, setIdProfesional] = useState(null);
  const [profesionales, setProfesionales] = useState([]);
  const [datosPorEstado, setDatosPorEstado] = useState([]);
  const [evolucion, setEvolucion] = useState([]);
  const [resumen, setResumen] = useState({
    total: 0,
    activos: 0,
    cancelados: 0,
    atendidos: 0,
  });

  const colores = ["#00C49F", "#FFBB28", "#FF8042", "#0088FE"];

  // 🔹 Cargar lista de profesionales



  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center mb-4">📊 Dashboard de Turnos</h2>

      {/* 🔽 Filtros */}
      <div className="flex flex-wrap justify-center gap-4">
        <div>
          <span className="block text-sm font-semibold">Profesional</span>
          <Select
            showSearch
            allowClear
            placeholder="Seleccione un profesional"
            style={{ width: 250 }}
            value={idProfesional}
            onChange={(value) => setIdProfesional(value)}
            options={profesionales.map((p) => ({
              label: `${p.apellido}, ${p.nombre}`,
              value: p.id,
            }))}
          />
        </div>

        <div>
          <span className="block text-sm font-semibold">Desde</span>
          <DatePicker
            value={fechaDesde}
            onChange={(date) => setFechaDesde(date)}
            format="DD/MM/YYYY"
          />
        </div>

        <div>
          <span className="block text-sm font-semibold">Hasta</span>
          <DatePicker
            value={fechaHasta}
            onChange={(date) => setFechaHasta(date)}
            format="DD/MM/YYYY"
          />
        </div>

        <div className="flex items-end">
          <Button >Buscar</Button>
        </div>
      </div>

      {/* 🔹 Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
       <Card >
          <div className="text-center">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-2xl font-bold">{resumen.total}</p>
          </div>
        </Card>
        <Card >
          <div className="text-center">
            <p className="text-sm text-gray-500">Activos</p>
            <p className="text-2xl font-bold text-green-600">{resumen.activos}</p>
          </div>
        </Card>
        <Card >
          <div className="text-center">
            <p className="text-sm text-gray-500">Cancelados</p>
            <p className="text-2xl font-bold text-red-600">{resumen.cancelados}</p>
          </div>
        </Card>
        <Card >
          <div className="text-center">
            <p className="text-sm text-gray-500">Atendidos</p>
            <p className="text-2xl font-bold text-blue-600">{resumen.atendidos}</p>
          </div>
        </Card>
      </div>

      {/* 🔸 Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Barras */}
        <Card >
          <div className="text-center">
          
            <h3 className="text-lg font-semibold mb-4">Turnos por Estado</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={datosPorEstado}>
                <XAxis dataKey="estado" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cantidad" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
         
            </div>
        </Card>

        {/* Torta */}
        <Card>
           <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Distribución de Estados</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={datosPorEstado}
                  dataKey="cantidad"
                  nameKey="estado"
                  outerRadius={100}
                  label
                >
                  {datosPorEstado.map((_, index) => (
                    <Cell key={index} fill={colores[index % colores.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          </Card>
        
      </div>

      {/* 📈 Evolución diaria */}
      <Card>
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">Evolución diaria de Turnos</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={evolucion}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cantidad" stroke="#8884d8" name="Turnos" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default DashboardTurnos;
