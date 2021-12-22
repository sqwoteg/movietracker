import React, { useState, useEffect } from "react";

const TextInputComponent = ({
    label,
    placeholder,
    value,
    onChange,
    multiline,
    defaultValue,
    type,
    name,
}) => {
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const timeOutId = setTimeout(() => onChange(event), 500);
        return () => clearTimeout(timeOutId);
    }, [event]);

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
                    onChange={(e) => setEvent(e)}
                    name={name}
                ></textarea>
            ) : (
                <input
                    type={type}
                    placeholder={placeholder}
                    className="input input-bordered"
                    defaultValue={defaultValue}
                    onChange={(e) => setEvent(e)}
                    onLoad={onChange}
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
