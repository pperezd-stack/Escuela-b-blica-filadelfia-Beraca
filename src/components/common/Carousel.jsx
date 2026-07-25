import { useEffect, useState } from "react";

import "../../styles/components/carousel.css";

export default function Carousel({

    slides = [],

    autoPlay = true,

    interval = 5000,

    showDots = true,

    showButtons = true,

    showOverlay = true

}) {

    const [actual, setActual] = useState(0);

    const siguiente = () => {

        setActual((prev) =>

            (prev + 1) % slides.length

        );

    };

    const anterior = () => {

        setActual((prev) =>

            prev === 0

                ? slides.length - 1

                : prev - 1

        );

    };

    useEffect(() => {

        if (!autoPlay || slides.length <= 1) return;

        const timer = setInterval(

            siguiente,

            interval

        );

        return () => clearInterval(timer);

    }, [actual, autoPlay, interval, slides.length]);

    if (!slides.length) return null;

    return (

        <section className="carousel">

            <div
                className="carousel-track"
                style={{
                    transform: `translateX(-${actual * 100}%)`
                }}
            >

                {slides.map((slide, index) => (

                    <div
                        key={index}
                        className="carousel-slide"
                    >

                        <img

                            src={slide.imagen}

                            alt={slide.titulo}

                        />

                    </div>

                ))}

            </div>

            {showOverlay && (

                <div className="carousel-overlay">

                    <div className="carousel-content">

                        <span className="carousel-eyebrow">

                            Escuela Bíblica

                        </span>

                        <h2>

                            {slides[actual].titulo}

                        </h2>

                        {slides[actual].resaltado && (

                            <h3>

                                {slides[actual].resaltado}

                            </h3>

                        )}

                        <p>

                            {slides[actual].texto ||

                                slides[actual].descripcion}

                        </p>

                    </div>

                    {showButtons && (

                        <div className="carousel-buttons">

                            <button onClick={anterior}>

                                ❮

                            </button>

                            <button onClick={siguiente}>

                                ❯

                            </button>

                        </div>

                    )}

                </div>

            )}

            {showDots && (

                <div className="carousel-dots">

                    {slides.map((_, index) => (

                        <span

                            key={index}

                            className={

                                actual === index

                                    ? "active"

                                    : ""

                            }

                            onClick={() =>

                                setActual(index)

                            }

                        />

                    ))}

                </div>

            )}

        </section>

    );

}