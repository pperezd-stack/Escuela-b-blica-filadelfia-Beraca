import ImageSlider from "./ImageSlider";
import "../../styles/pages/sistema/topbar.css";
import "../../styles/pages/sistema/sistema.css"; // 👈 O la ruta a tu CSS correspondiente

const SistemaLayout = ({ children }) => {
    return (
        <main className="sistema-page">
            <section className="sistema-card">
                {/* Panel lateral con imagen/versículo */}
                <ImageSlider />

                {/* Panel de contenido derecho */}
                <section className="sistema-content">
                    <section className="sistema-scroll">
                        {children}
                    </section>
                </section>
            </section>
        </main>
    );
};

export default SistemaLayout;