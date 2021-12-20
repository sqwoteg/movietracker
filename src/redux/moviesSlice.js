import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadMovies = createAsyncThunk("movies/loadMovies", async () => {
    try {
        const movies = localStorage.getItem("movies");
        if (movies === null) return [];
        return JSON.parse(movies);
    } catch (error) {
        console.log(error);
        return [];
    }
});

export const saveMovies = createAsyncThunk("movies/saveMovies", async (movies) => {
    try {
        localStorage.setItem("movies", JSON.stringify(movies));
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
        list: [],
        lastID: 0,
    },
    extraReducers: {
        [loadMovies.fulfilled]: (state, action) => {
            state.list = action.payload;
            state.lastID = action.payload[action.payload.length - 1].id;
        },
        [addMovie.fulfilled]: (state, action) => {
            state.list.push({ ...action.payload, id: state.lastID + 1});
            state.lastID += 1;
        },
        [removeMovies.fulfilled]: (state, action) => {
            state.list = state.list.filter((movie) => !action.payload.includes(movie.id));
        },
        [setMovieMark.fulfilled]: (state, action) => {
            const movieIndex = state.list.findIndex((movie => movie.id == action.payload.id));
            state.list[movieIndex].mark = action.payload.mark;
        },
        [editMovie.fulfilled]: (state, action) => {
            const movieIndex = state.list.findIndex((movie => movie.id == action.payload.id));
            let newMovie = {...action.payload.movie, id: action.payload.id};
            state.list[movieIndex] = newMovie;
        },
    },
});

export const selectMovies = (state) => state.movies.list;
export const selectMovie = id => state => {console.log(id, state.movies); return state.movies.list.filter((movie) => movie.id === id)[0]};
export const selectMoviesCount = (state) => state.movies.count;

export default moviesSlice.reducer;
