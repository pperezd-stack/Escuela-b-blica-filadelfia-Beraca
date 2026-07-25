import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import SidebarProfesor from "../components/profesor/SidebarProfesor";
import ProfesorDashboard from "../components/sistema/ProfesorDashboard"; // Importamos el dashboard del profesor

const Profesor = () => {
    return (
        <>
            <Header />

            <div className="container-fluid">
                <div className="row">
                    {/* Menú Lateral (Estudiantes / Módulos / Inicio) */}
                    <div className="col-md-2">
                        <SidebarProfesor />
                    </div>

                    {/* Contenido Principal: Saludo y Tarjetas */}
                    <div className="col-md-10 p-4">
                        <ProfesorDashboard />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Profesor;