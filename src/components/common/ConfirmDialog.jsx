import React from "react";

const ConfirmDialog = ({
    mensaje,
    onConfirm,
    onCancel
}) => {

    return (

        <div className="confirm-dialog">

            <h3>Confirmación</h3>

            <p>{mensaje}</p>

            <div className="btn-group">

                <button
                    className="btn btn-danger"
                    onClick={onConfirm}
                >

                    Sí

                </button>

                <button
                    className="btn btn-secondary"
                    onClick={onCancel}
                >

                    Cancelar

                </button>

            </div>

        </div>

    );

};

export default ConfirmDialog;