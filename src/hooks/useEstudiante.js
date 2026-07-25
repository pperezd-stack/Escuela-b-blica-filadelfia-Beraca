import { useEffect, useState } from "react";

import {

    obtenerDatosEstudiante

} from "../services/estudianteService";

const useEstudiante = (nombre) => {

    const [modulo, setModulo] = useState("");

    const [notas, setNotas] = useState({

        corte1: "—",

        corte2: "—",

        corte3: "—",

        final: "—"

    });

    const [comentarios, setComentarios] = useState({

        corte1: "",

        corte2: "",

        corte3: ""

    });

    useEffect(() => {

        if(nombre){

            cargarDatos();

        }

    }, [nombre]);

    const cargarDatos = async () => {

        try{

            const datos = await obtenerDatosEstudiante(nombre);

            setModulo(datos.modulo);

            setNotas(datos.notas);

            setComentarios(datos.comentarios);

        }

        catch(error){

            console.error(error);

        }

    };

    return {

        modulo,

        notas,

        comentarios,

        cargarDatos

    };

};

export default useEstudiante;