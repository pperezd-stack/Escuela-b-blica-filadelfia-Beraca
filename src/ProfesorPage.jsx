import { useEffect, useState } from "react";

import {
    cargarEstudiantesBD,
    guardarHistorialAcademicoAPI
} from "../services/profesorService";


export default function ProfesorPage() {


    const [estudiantes, setEstudiantes] = useState([]);

    const [calificaciones, setCalificaciones] = useState([]);

    const [observaciones, setObservaciones] = useState([]);


    const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null);


    const [mostrarModal, setMostrarModal] = useState(false);


    const [formulario, setFormulario] = useState({

        modulo:{
            id:""
        },

        corte1:"",
        corte2:"",
        corte3:"",
        notaFinal:"",

        comentarioCorte1:"",
        comentarioCorte2:"",
        comentarioCorte3:""

    });



    // ============================================
    // CARGAR DATOS INICIALES
    // ============================================

    useEffect(()=>{

        cargarDatos();

    },[]);



    async function cargarDatos(){

        try{

            const datos = await cargarEstudiantesBD();


            const soloEstudiantes =
                datos.estudiantes.filter(
                    u => u.rol === "ESTUDIANTE"
                );


            setEstudiantes(soloEstudiantes);

            setCalificaciones(datos.calificaciones);

            setObservaciones(datos.observaciones);



        }catch(error){

            console.error(
                "Error cargando profesor",
                error
            );

        }

    }





    // ============================================
    // ABRIR PERFIL ESTUDIANTE
    // ============================================

    function abrirPerfil(estudiante){


        setEstudianteSeleccionado(estudiante);



        const nota =
            calificaciones.find(
                c =>
                c.estudiante?.id === estudiante.id
            );



        const obs =
            observaciones.find(
                o =>
                o.estudiante?.id === estudiante.id
            );




        setFormulario({

            modulo:{
                id: nota?.modulo?.id || ""
            },


            corte1:
            nota?.corte1 || "",


            corte2:
            nota?.corte2 || "",


            corte3:
            nota?.corte3 || "",


            notaFinal:
            nota?.notaFinal || "",



            comentarioCorte1:
            obs?.comentarioCorte1 || "",


            comentarioCorte2:
            obs?.comentarioCorte2 || "",


            comentarioCorte3:
            obs?.comentarioCorte3 || ""

        });


        setMostrarModal(true);

    }






    // ============================================
    // CAMBIO DE INPUT
    // ============================================

    function cambiarCampo(e){

        const {name,value}=e.target;


        setFormulario({

            ...formulario,

            [name]:value

        });

    }






    // ============================================
    // CALCULO AUTOMATICO
    // ============================================

    function calcularNota(){


        const c1 =
        Number(formulario.corte1)||0;


        const c2 =
        Number(formulario.corte2)||0;


        const c3 =
        Number(formulario.corte3)||0;



        const promedio =
        ((c1+c2+c3)/3)
        .toFixed(1);



        setFormulario({

            ...formulario,

            notaFinal:promedio

        });


    }







    // ============================================
    // GUARDAR
    // ============================================

    async function guardar(){


        try{


            const calificacion = {


                estudiante:{
                    id:
                    estudianteSeleccionado.id
                },


                modulo:{
                    id:
                    Number(formulario.modulo.id)
                },


                corte1:
                formulario.corte1,


                corte2:
                formulario.corte2,


                corte3:
                formulario.corte3,


                notaFinal:
                formulario.notaFinal


            };





            const observacion={


                estudiante:{
                    id:
                    estudianteSeleccionado.id
                },


                modulo:{
                    id:
                    Number(formulario.modulo.id)
                },


                comentarioCorte1:
                formulario.comentarioCorte1,


                comentarioCorte2:
                formulario.comentarioCorte2,


                comentarioCorte3:
                formulario.comentarioCorte3,


                fecha:
                new Date()
                .toISOString()


            };





            await guardarHistorialAcademicoAPI(

                calificacion,

                observacion

            );



            alert(
                "Información guardada correctamente"
            );



            setMostrarModal(false);


            await cargarDatos();



        }catch(error){

            console.error(error);

            alert(
                "Error guardando información"
            );

        }


    }





return (

<div className="profesor-container">


<h1>
Panel del Profesor
</h1>



<div className="lista-estudiantes">


{
estudiantes.map(est=>(


<div
key={est.id}
className="card-estudiante"

onClick={()=>abrirPerfil(est)}
>


<h3>
{est.nombre}
</h3>


<p>
{est.correo}
</p>


</div>


))
}


</div>





{
mostrarModal && (


<div className="modal">


<div className="modal-contenido">


<h2>

{
estudianteSeleccionado.nombre
}

</h2>




<select

value={formulario.modulo.id}

onChange={(e)=>

setFormulario({

...formulario,

modulo:{
id:e.target.value
}

})

}

>


<option value="">
Seleccione módulo
</option>


<option value="1">
Módulo I
</option>


<option value="2">
Módulo II
</option>


<option value="3">
Módulo III
</option>


</select>




<input
name="corte1"
value={formulario.corte1}
onChange={cambiarCampo}
onBlur={calcularNota}
placeholder="Corte 1"
/>


<input
name="corte2"
value={formulario.corte2}
onChange={cambiarCampo}
onBlur={calcularNota}
placeholder="Corte 2"
/>


<input
name="corte3"
value={formulario.corte3}
onChange={cambiarCampo}
onBlur={calcularNota}
placeholder="Corte 3"
/>


<input
value={formulario.notaFinal}
readOnly
placeholder="Nota final"
/>





<textarea

name="comentarioCorte1"

value={formulario.comentarioCorte1}

onChange={cambiarCampo}

placeholder="Observación corte 1"

/>



<textarea

name="comentarioCorte2"

value={formulario.comentarioCorte2}

onChange={cambiarCampo}

placeholder="Observación corte 2"

/>



<textarea

name="comentarioCorte3"

value={formulario.comentarioCorte3}

onChange={cambiarCampo}

placeholder="Observación corte 3"

/>





<button
onClick={guardar}
>
Guardar
</button>



<button
onClick={()=>setMostrarModal(false)}
>
Cerrar
</button>



</div>

</div>


)

}


</div>

);


}