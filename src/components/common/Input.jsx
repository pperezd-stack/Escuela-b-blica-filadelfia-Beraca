import React from "react";

const Input = ({
    label,
    type = "text",
    value,
    onChange,
    placeholder = "",
    name
}) => {

    return (

        <div className="form-group">

            {label &&

                <label>{label}</label>

            }

            <input

                type={type}
                value={value}
                name={name}
                placeholder={placeholder}
                onChange={onChange}

            />

        </div>

    );

};

export default Input;