import { createAsyncThunk, createSlice, findNonSerializableValue } from "@reduxjs/toolkit";

let lastID = -1;

export const loadMovies = createAsyncThunk("movies/loadMovies", async () => {
    try {
        const movies = localStorage.getItem("movies");
        const lastID = localStorage.getItem("lastid");
        if (movies === null || lastID === null) return {movies: {}, lastID: -1};
        return {movies: JSON.parse(movies), lastID: +lastID};
    } catch (error) {
        console.log(error);
        return [];
    }
});

export const saveMovies = createAsyncThunk("movies/saveMovies", async (movies) => {
    try {
        localStorage.setItem("movies", JSON.stringify(movies));
        localStorage.setItem("lastid", lastID);
    } catch (error) {
        console.log(error);
    }
});

export const addMovie = createAsyncThunk("movies/addMovie", async (movie) => {
    return movie;
});

export const removeMovies = createAsyncThunk("movies/removeMovies", async ({ids}) => {
    return ids;
});

export const setMovieMark = createAsyncThunk("movies/setMovieMark", async (payload) => {
    return payload;
});

export const editMovie = createAsyncThunk("movies/editMovie", async (payload) => {
    return payload;
});

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        list: {},
    },
    extraReducers: {
        [loadMovies.fulfilled]: (state, action) => {
            state.list = action.payload.movies;
            lastID = action.payload.lastID;
        },
        [addMovie.fulfilled]: (state, action) => {
            state.list[lastID + 1] = { ...action.payload, id: lastID + 1 };
            lastID += 1;
        },
        [removeMovies.fulfilled]: (state, action) => {
            for (let id of action.payload)
                delete state.list[id];
        },
        [setMovieMark.fulfilled]: (state, action) => {
            state.list[action.payload.id].mark = action.payload.mark;
        },
        [editMovie.fulfilled]: (state, action) => {
            let newMovie = {...action.payload.movie, id: action.payload.id};
            state.list[action.payload.id] = newMovie;
        },
    },
});

export const selectMovies = (state) => Object.values(state.movies.list);
export const selectMovie = id => state => state.movies.list[id];
export const selectMoviesCount = (state) => state.movies.count;

export default moviesSlice.reducer;
