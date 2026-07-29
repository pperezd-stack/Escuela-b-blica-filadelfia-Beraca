export const guardarUsuario = (usuario) => {
    if (usuario) {
        // Limpiamos si trae el módulo con dos puntos (ej: "10:1" -> "10")
        if (usuario.moduloId && typeof usuario.moduloId === "string" && usuario.moduloId.includes(":")) {
            usuario.moduloId = usuario.moduloId.split(":")[0].trim();
        }
        if (usuario.modulo_id && typeof usuario.modulo_id === "string" && usuario.modulo_id.includes(":")) {
            usuario.modulo_id = usuario.modulo_id.split(":")[0].trim();
        }
        if (usuario.modulo && typeof usuario.modulo === "string" && usuario.modulo.includes(":")) {
            usuario.modulo = usuario.modulo.split(":")[0].trim();
        }
    }

    localStorage.setItem(
        "usuario",
        JSON.stringify(usuario)
    );
};

export const obtenerUsuario = () => {
    const usuario = localStorage.getItem("usuario");
    return usuario ? JSON.parse(usuario) : null;
};

export const cerrarSesion = () => {
    localStorage.clear();
};

export const obtenerRol = () => {
    return localStorage.getItem("fb_rol");
};

export const obtenerNombre = () => {
    return localStorage.getItem("fb_nombre");
};