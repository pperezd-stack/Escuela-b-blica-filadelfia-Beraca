import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import SearchBar from "../components/profesor/SearchBar";
import StudentGrid from "../components/profesor/StudentGrid";
import HistorialModal from "../components/profesor/HistorialModal";

import useModulosProfesor from "../hooks/useModulosProfesor";

const ModulosProfesor = () => {

    const {
        buscador,
        setBuscador,
        estudiantes,
        modalAbierto,
        estudianteSeleccionado,
        datos,
        setDatos,
        abrirModal,
        cerrarModal,
        guardarCambios,
        modulos,
        moduloActualNombre // 🔑 Tomamos el nombre del módulo actual del hook
    } = useModulosProfesor();

    return (
        <>
            <Header />

            <div className="dashboard-container">

                {/* 🔑 Pasamos el nombre del módulo para que el buscador/etiqueta muestre el módulo real */}
                <SearchBar
                    buscador={buscador}
                    setBuscador={setBuscador}
                    cantidad={estudiantes.length}
                    moduloActual={moduloActualNombre} 
                />

                <StudentGrid
                    estudiantes={estudiantes}
                    onSeleccionar={abrirModal}
                />

            </div>

            <HistorialModal
                visible={modalAbierto}
                estudiante={estudianteSeleccionado}
                datos={datos}
                setDatos={setDatos}
                modulos={modulos}
                onCerrar={cerrarModal}
                onGuardar={guardarCambios}
            />

            <Footer />
        </>
    );
};

export default ModulosProfesor;