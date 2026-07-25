import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import Carousel from "../components/common/Carousel";
import { loginSlides } from "../data/carouselData";
import SelectorRol from "../components/login/SelectorRol";

import LoginProfesor from "../components/login/LoginProfesor";
import LoginEstudiante from "../components/login/LoginEstudiante";

import RegistroProfesor from "../components/login/RegistroProfesor";
import RegistroEstudiante from "../components/login/RegistroEstudiante";

import "../styles/pages/login.css";

export default function Login() {
    const [searchParams] = useSearchParams();

    // Leemos los valores directamente de la URL (si vienen)
    const rolParam = searchParams.get("rol")?.toUpperCase();
    const vistaParam = searchParams.get("vista")?.toUpperCase();

    const [rol, setRol] = useState(rolParam === "ESTUDIANTE" ? "ESTUDIANTE" : "PROFESOR");
    const [vista, setVista] = useState(vistaParam === "REGISTRO" ? "REGISTRO" : "LOGIN");

    // Sincroniza si los parámetros de la URL cambian sobre la marcha
    useEffect(() => {
        if (rolParam) setRol(rolParam === "ESTUDIANTE" ? "ESTUDIANTE" : "PROFESOR");
        if (vistaParam) setVista(vistaParam === "REGISTRO" ? "REGISTRO" : "LOGIN");
    }, [rolParam, vistaParam]);

    return (
        <>
            <Header />

            <main className="login-page">
                <div className="login-card">

                    {/* Panel izquierdo */}
                    <section className="form-panel">

                        <SelectorRol
                            rol={rol}
                            setRol={setRol}
                            setVista={setVista}
                        />

                        {vista === "LOGIN" ? (
                            rol === "PROFESOR" ? (
                                <LoginProfesor cambiarVista={() => setVista("REGISTRO")} />
                            ) : (
                                <LoginEstudiante cambiarVista={() => setVista("REGISTRO")} />
                            )
                        ) : (
                            rol === "PROFESOR" ? (
                                <RegistroProfesor volver={() => setVista("LOGIN")} />
                            ) : (
                                <RegistroEstudiante volver={() => setVista("LOGIN")} />
                            )
                        )}

                    </section>

                    {/* Panel derecho */}
                    <aside className="login-banner">
                        <Carousel slides={loginSlides} />
                    </aside>

                </div>
            </main>

            <Footer />
        </>
    );
}