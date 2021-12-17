module.exports = {
    content: ["./src/**/*.{jsx,scss}"],
    theme: {
        extend: {
            colors: {
                appBackground: "#f1f1f1"
            },
        },
    },
    plugins: [require("daisyui")],
};
