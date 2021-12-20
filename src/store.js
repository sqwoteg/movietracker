import { configureStore } from "@reduxjs/toolkit";
import movies from "./redux/moviesSlice";

const store = configureStore({
    reducer: {
        movies: movies,
    },
});
export default store;