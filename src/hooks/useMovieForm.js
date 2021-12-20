import { useState } from "react";

const useForm = (callback) => {
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
                        year: "Year should be in (1800; 2100)",
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

        let name = event.target.name;
        let val = event.target.value;

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
            alert("There is an Error!");
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
