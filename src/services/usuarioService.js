import API from "./api";

/* ==========================================
   LISTAR USUARIOS
========================================== */
export const listarUsuarios = async () => {
    const response = await API.get("/usuarios");
    return response.data;
};

/* ==========================================
   BUSCAR POR ID
========================================== */
export const buscarPorId = async (id) => {
    const response = await API.get(`/usuarios/${id}`);
    return response.data;
};

/* ==========================================
   CREAR USUARIO GENÉRICO
========================================== */
export const crearUsuario = async (usuario) => {
    const response = await API.post("/usuarios/crear", usuario);
    return response.data;
};

/* ==========================================
   REGISTRAR PROFESOR (CON MÓDULO ASOCIADO)
========================================== */
export const registrarProfesor = async (profesor) => {
    // 🟢 Cambiado a /usuarios/crear-profesor
    const response = await API.post(
        "/usuarios/crear-profesor",
        profesor
    );
    return response.data;
};

/* ==========================================
   REGISTRAR ESTUDIANTE
========================================== */
export const registrarEstudiante = async (estudiante) => {
    const response = await API.post(
        "/usuarios/crear",
        estudiante
    );
    return response.data;
};

/* ==========================================
   ELIMINAR USUARIO
========================================== */
export const eliminarUsuario = async (id) => {
    const response = await API.delete(`/usuarios/${id}`);
    return response.data;
};