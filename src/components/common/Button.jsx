import React from "react";

const Button = ({
    children,
    type = "button",
    className = "",
    onClick,
    disabled = false
}) => {

    return (

        <button
            type={type}
            className={`btn ${className}`}
            onClick={onClick}
            disabled={disabled}
        >

            {children}

        </button>

    );

};

export default Button;