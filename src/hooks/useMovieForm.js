import { useState } from "react";

const useForm = (callback, err) => {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});

    const validate = (event, name, value) => {
        switch (name) {
            case "year":
                if (value === "") break;
                value = +value;
                if ((value > 2100 || value < 1800)) {
                    setErrors({
                        ...errors,
                        year: "Year should be between 1800 and 2100",
                    });
                } else {
                    const { year, ...newObj } = errors;
                    setErrors(newObj);
                }
                break;
            default:
                break;
        }
    };

    const handleChange = (event) => {
        event.persist();

        console.log(event);
        let name = event.target.name;
        let val;
        if (event.target.type === "checkbox") val = event.target.checked;
        else val = event.target.value;

        validate(event, name, val);

        setValues({
            ...values,
            [name]: val,
        });
    };

    const handleSubmit = (event) => {
        if (event) event.preventDefault();

        if (
            Object.keys(errors).length === 0 &&
            Object.keys(values).length !== 0
        ) {
            callback();
        } else {
            err(errors);
            console.log(errors)
        }
    };

    return {
        values,
        errors,
        handleChange,
        handleSubmit,
    };
};

export default useForm;
