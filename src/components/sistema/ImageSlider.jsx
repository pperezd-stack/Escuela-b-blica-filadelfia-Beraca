import React, { useState, useEffect } from "react";

// Arreglo con las rutas de tus imágenes ubicadas en public/img/
const imagenes = [
    "/img/alabanza.jpg",
    "/img/bautismo.jpg",
    "/img/compartir.jpg",
    "/img/frase.jpg",
    "/img/grupo.jpg",
    "/img/predica.jpg",
    "/img/servicio.jpg",
    "/img/unidos.jpg"
];

export default function ImageSlider() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // Transición automática cada 4 segundos
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % imagenes.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div 
            className="sistema-slider-container"
            style={{
                backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.85)), url(${imagenes[index]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'background-image 1s ease-in-out'
            }}
        >
            <div className="sistema-slider-content">
                <h2>
                    Escuela Bíblica<br />
                    Filadelfia<br />
                    <span className="highlight-text">Beraca</span>
                </h2>
                <p>
                    "Instruye al niño en el camino que debe seguir, y cuando sea mayor no se apartará de él."
                </p>
                <span className="verse-citation">Proverbios 22:6</span>
            </div>
        </div>
    );
}