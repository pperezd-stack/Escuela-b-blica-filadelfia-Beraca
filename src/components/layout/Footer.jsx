

export default function Footer() {


    const anio = new Date().getFullYear();

    return (

        <footer>

            <div>

                <h3>Plataforma Beraca</h3>

                <p>
                    Escuela Bíblica Filadelfia Beraca El Carito
                </p>

            </div>

            <div>

                <h4>Información</h4>

                <p>
                    Sistema académico para el registro de
                    calificaciones y observaciones.
                </p>

            </div>

            <div>

            </div>

            <hr />

            <p>

                © {anio} Plataforma Beraca.
                Creado por Paula Pérez y Camilo Guzmán.

            </p>

        </footer>

    );

}