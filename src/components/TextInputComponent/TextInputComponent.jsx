import React, { useState, useEffect } from "react";

const TextInputComponent = ({
    label,
    placeholder,
    onChange,
    multiline,
    defaultValue,
    type,
    name,
}) => {

    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            {multiline ? (
                <textarea
                    className="textarea h-24 textarea-bordered"
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    name={name}
                ></textarea>
            ) : (
                <input
                    type={type}
                    placeholder={placeholder}
                    className="input input-bordered"
                    defaultValue={defaultValue}
                    onChange={onChange}
                    name={name}
                />
            )}
        </div>
    );
};

TextInputComponent.defaultProps = {
    multiline: false,
    type: "text",
};

export default TextInputComponent;
