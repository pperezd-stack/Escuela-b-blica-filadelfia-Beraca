import React, { useEffect, useState } from "react";

const StudentModal = ({
    estudiante,
    visible,
    modulos,
    onCerrar,
    onGuardar
}) => {
    const [formulario, setFormulario] = useState({
        moduloId: "",
        corte1: "",
        corte2: "",
        corte3: "",
        notaFinal: "",
        comentarioCorte1: "",
        comentarioCorte2: "",
        comentarioCorte3: ""
    });

    useEffect(() => {
        if (!estudiante) return;

        // Detectar el ID del módulo evaluando todas las propiedades posibles del objeto
        const idModuloDetectado = 
            estudiante.moduloId || 
            estudiante.modulo_id || 
            estudiante.modulo?.id || 
            estudiante.calificacion?.moduloId ||
            estudiante.calificacion?.modulo_id ||
            "";

        setFormulario({
            moduloId: idModuloDetectado ? String(idModuloDetectado) : "",
            corte1: estudiante.calificacion?.corte1 || "",
            corte2: estudiante.calificacion?.corte2 || "",
            corte3: estudiante.calificacion?.corte3 || "",
            notaFinal: estudiante.calificacion?.notaFinal || estudiante.calificacion?.nota_final || "",
            comentarioCorte1: estudiante.observacion?.comentarioCorte1 || estudiante.observacion?.comentario_corte1 || "",
            comentarioCorte2: estudiante.observacion?.comentarioCorte2 || estudiante.observacion?.comentario_corte2 || "",
            comentarioCorte3: estudiante.observacion?.comentarioCorte3 || estudiante.observacion?.comentario_corte3 || ""
        });
    }, [estudiante]);

    useEffect(() => {
        calcularNotaFinal();
    }, [
        formulario.corte1,
        formulario.corte2,
        formulario.corte3
    ]);

    const cambiarValor = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
    };

    const calcularNotaFinal = () => {
        const c1 = parseFloat(formulario.corte1) || 0;
        const c2 = parseFloat(formulario.corte2) || 0;
        const c3 = parseFloat(formulario.corte3) || 0;

        const promedio = ((c1 + c2 + c3) / 3).toFixed(2);

        setFormulario(prev => ({
            ...prev,
            notaFinal: promedio
        }));
    };

    const guardar = () => {
        onGuardar(estudiante.id, formulario);
    };

    if (!visible) return null;

    return (
        <div className="modal d-block">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4>
                            {estudiante.nombre}
                        </h4>
                        <button
                            className="btn-close"
                            onClick={onCerrar}
                        />
                    </div>

                    <div className="modal-body">
                        <div className="mb-3">
                            <label>Módulo</label>
                            <select
                                className="form-select"
                                name="moduloId"
                                value={formulario.moduloId}
                                onChange={cambiarValor}
                            >
                                <option value="">
                                    Seleccione...
                                </option>
                                {modulos.map(modulo => (
                                    <option
                                        key={modulo.id}
                                        value={modulo.id}
                                    >
                                        {modulo.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label>Corte 1</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="corte1"
                                    value={formulario.corte1}
                                    onChange={cambiarValor}
                                />
                            </div>
                            <div className="col">
                                <label>Corte 2</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="corte2"
                                    value={formulario.corte2}
                                    onChange={cambiarValor}
                                />
                            </div>
                            <div className="col">
                                <label>Corte 3</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="corte3"
                                    value={formulario.corte3}
                                    onChange={cambiarValor}
                                />
                            </div>
                        </div>

                        <div className="mt-3">
                            <label>Nota Final</label>
                            <input
                                className="form-control"
                                value={formulario.notaFinal}
                                readOnly
                            />
                        </div>

                        <hr />

                        <label>Observación Corte 1</label>
                        <textarea
                            className="form-control mb-2"
                            rows="2"
                            name="comentarioCorte1"
                            value={formulario.comentarioCorte1}
                            onChange={cambiarValor}
                        />

                        <label>Observación Corte 2</label>
                        <textarea
                            className="form-control mb-2"
                            rows="2"
                            name="comentarioCorte2"
                            value={formulario.comentarioCorte2}
                            onChange={cambiarValor}
                        />

                        <label>Observación Corte 3</label>
                        <textarea
                            className="form-control"
                            rows="2"
                            name="comentarioCorte3"
                            value={formulario.comentarioCorte3}
                            onChange={cambiarValor}
                        />
                    </div>

                    <div className="modal-footer">
                        <button
                            className="btn btn-secondary"
                            onClick={onCerrar}
                        >
                            Cancelar
                        </button>
                        <button
                            className="btn btn-success"
                            onClick={guardar}
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentModal;