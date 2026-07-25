import { Carousel } from "bootstrap";
import { useEffect } from "react";

const DecorativePanel = () => {

    useEffect(() => {

        const carousel = document.querySelector("#loginCarousel");

        if (carousel) {

            new Carousel(carousel, {

                interval: 4000,
                ride: "carousel",
                pause: false,
                touch: true

            });

        }

    }, []);

    return (

        <section className="login-decorative-panel">

            <div
                id="loginCarousel"
                className="carousel slide login-decorative-carousel"
                data-bs-ride="carousel"
            >

                <div className="carousel-indicators">

                    <button
                        type="button"
                        data-bs-target="#loginCarousel"
                        data-bs-slide-to="0"
                        className="active"
                    />

                    <button
                        type="button"
                        data-bs-target="#loginCarousel"
                        data-bs-slide-to="1"
                    />

                </div>

                <div className="carousel-inner">

                    <div className="carousel-item active">

                        <img
                            src="/img/alabanza.jpg"
                            className="d-block w-100"
                            alt="Alabanza"
                        />

                    </div>

                    <div className="carousel-item">

                        <img
                            src="/img/frase.jpg"
                            className="d-block w-100"
                            alt="Escuela Bíblica"
                        />

                    </div>

                </div>

            </div>

            <div className="login-decorative-content">

                <div className="login-decorative-logo">

                    <span className="login-decorative-title">

                        Escuela Bíblica

                    </span>

                    <h1>

                        Filadelfia

                        <br />

                        <span>

                            Beraca

                        </span>

                    </h1>

                    <span className="login-decorative-subtitle">

                        El Carito · Sistema Académico

                    </span>

                </div>

                <div className="login-decorative-footer">

                    <p className="login-decorative-quote">

                        "Instruye al niño en el camino que debe seguir,
                        y cuando sea viejo no se apartará de él."

                    </p>

                    <span className="login-decorative-reference">

                        Proverbios 22:6

                    </span>

                </div>

            </div>

        </section>

    );

};

export default DecorativePanel;