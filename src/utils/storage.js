export const guardarUsuario = (usuario) => {

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