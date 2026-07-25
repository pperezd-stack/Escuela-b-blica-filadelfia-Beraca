import React from "react";

const EmptyState = ({ mensaje }) => {

    return (

        <div className="empty-state">

            <h3>No hay información</h3>

            <p>{mensaje}</p>

        </div>

    );

};

export default EmptyState;