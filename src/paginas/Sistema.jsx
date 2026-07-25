import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Importación de componentes
import SistemaLayout from "../components/sistema/SistemaLayout";
import ProfesorDashboard from "../components/sistema/ProfesorDashboard";
import EstudianteDashboard from "../components/sistema/EstudianteDashboard";

const Sistema = () => {
    const navigate = useNavigate();

    const [rol, setRol] = useState("");
    const [nombre, setNombre] = useState("");
    const [modulo, setModulo] = useState("");

    const [notas, setNotas] = useState({
        corte1: 0,
        corte2: 0,
        corte3: 0,
        final: 0,
    });

    const [comentarios, setComentarios] = useState({
        corte1: "",
        corte2: "",
        corte3: "",
    });

    useEffect(() => {
        const usuarioStored = localStorage.getItem("usuario");

        if (!usuarioStored) {
            navigate("/login");
            return;
        }

        try {
            const usuario = JSON.parse(usuarioStored);

            setRol(usuario.rol || "");
            
            // Sanitizamos 'nombre' para asegurar que sea siempre String
            const nombreString = typeof usuario.nombre === "object" 
                ? (usuario.nombre?.nombre || usuario.nombre?.primerNombre || "Usuario") 
                : (usuario.nombre || "");

            setNombre(String(nombreString));
            setModulo(usuario.modulo || "");

            if (usuario.rol?.toUpperCase() === "PROFESOR") {
                const idModulo = usuario.moduloId ?? usuario.modulo_id ?? usuario.idModulo;
                if (idModulo && !localStorage.getItem("moduloId")) {
                    localStorage.setItem("moduloId", idModulo.toString());
                }
            }

            setNotas({
                corte1: usuario.corte1 ?? 0,
                corte2: usuario.corte2 ?? 0,
                corte3: usuario.corte3 ?? 0,
                final: usuario.final ?? 0,
            });

            setComentarios({
                corte1: usuario.comentario1 ?? "",
                corte2: usuario.comentario2 ?? "",
                corte3: usuario.comentario3 ?? "",
            });
        } catch (error) {
            console.error("Error al procesar la sesión:", error);
            localStorage.clear();
            navigate("/login");
        }
    }, [navigate]);

    if (!rol) {
        return null;
    }

    // 🎓 VISTA PARA ESTUDIANTE (sin contenedor SistemaLayout)
    if (rol.toUpperCase() === "ESTUDIANTE" || rol.toUpperCase() === "ROLE_STUDENT") {
        return (
            <div key="vista-estudiante-container" style={{ width: '100%', minHeight: '100vh' }}>
                <EstudianteDashboard
                    nombre={nombre}
                    modulo={modulo}
                    notas={notas}
                    comentarios={comentarios}
                />
            </div>
        );
    }

    // 👨‍🏫 VISTA PARA PROFESOR (con SistemaLayout)
    return (
        <div key="vista-profesor-container" style={{ width: '100%', minHeight: '100vh' }}>
            <SistemaLayout rol={rol} modulo={modulo}>
                <ProfesorDashboard nombre={nombre} />
            </SistemaLayout>
        </div>
    );
};

export default Sistema;