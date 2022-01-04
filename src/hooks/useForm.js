import { useEffect, useState } from "react";

const useForm = (options) => {
    const [data, setData] = useState(options?.initialValues || {});
    const [errors, setErrors] = useState({});

    const handleChange = (key, sanitizeFn) => (e) => {
        let value;
        if (e.target.type === "checkbox") value = e.target.checked;
        else value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;
        setData({
            ...data,
            [key]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validations = options?.validations;

        if (validations) {
            console.log(data);
            let valid = true; // all form valid
            const newErrors = {};
            for (const key in validations) {
                const value = data[key];
                const validation = validations[key];

                // required field
                if (validation?.required?.value && !value) {
                    valid = false;
                    newErrors[key] = validation?.required?.message;
                }

                // regexp pattern
                const pattern = validation?.pattern;
                if (pattern?.value && !RegExp(pattern.value).test(value)) {
                    valid = false;
                    newErrors[key] = pattern.message;
                }

                // custom validating function
                const custom = validation?.custom;
                if (custom?.isValid && !custom.isValid(value)) {
                    valid = false;
                    newErrors[key] = custom.message;
                }
            }

            if (!valid) {
                console.log("not valid")
                setErrors(newErrors);
                if (options?.onErrors) {
                    options.onErrors(newErrors);
                }
                return;
            }
        }

        setErrors({});

        if (options?.onSubmit) {
            options.onSubmit();
        }
    };

    return {
        data,
        handleChange,
        handleSubmit,
        errors,
    };
};

export default useForm;
