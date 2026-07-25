import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Index from "./paginas/Index";
import Login from "./paginas/Login";
import Sistema from "./paginas/Sistema";
import ListaEstudiantes from "./paginas/ListaEstudiantes";
import ModulosProfesor from "./paginas/ModulosProfesor";
import EstudianteDashboard from "./components/sistema/EstudianteDashboard";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Index />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        {/* ⚡ Ruta principal con el carrusel */}
        <Route
          path="/sistema"
          element={<Sistema />}
        />

        {/* ⚡ Redirige /profesor a /sistema */}
        <Route
          path="/profesor"
          element={<Navigate to="/sistema" replace />}
        />

        {/* 🎓 RUTA NUEVA: Vista del Estudiante */}
        <Route
          path="/estudiante"
          element={<EstudianteDashboard />}
        />

        <Route
          path="/lista-estudiantes"
          element={<ListaEstudiantes />}
        />

        <Route
          path="/modulos-profesor"
          element={<ModulosProfesor />}
        />

        {/* Comodín de rutas no encontradas */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}