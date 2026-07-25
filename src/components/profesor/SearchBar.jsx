import "../../styles/pages/ListaEstudiantes/SearchBar.css";

const SearchBar = ({ buscador, setBuscador, cantidad, moduloActual }) => {

    return (
        <div className="search-section">
            <div className="search-header">
                <div>
                    <span className="search-tag">
                        Panel Docente
                    </span>

                    <h2>
                        Lista de <em>Estudiantes</em>
                    </h2>
                </div>
            </div>

            {/* 🔑 Elemento dinámico que muestra el módulo actual del profesor */}
            <div className="modulo-badge-container" style={{ margin: "10px 0" }}>
                <span className="btn-modulo-actual" style={{ 
                    display: "inline-flex", 
                    alignItems: "center", 
                    gap: "8px", 
                    background: "#e0f2fe", 
                    color: "#0369a1", 
                    padding: "6px 14px", 
                    borderRadius: "20px", 
                    fontWeight: "600",
                    fontSize: "0.9rem"
                }}>
                    📚 {moduloActual || "Módulo General"}
                </span>
            </div>

            <div className="search-row">
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={buscador}
                    onChange={(e) => setBuscador(e.target.value)}
                />

                <span className="student-count">
                    {cantidad} estudiante{cantidad !== 1 && "s"}
                </span>
            </div>
        </div>
    );
};

export default SearchBar;