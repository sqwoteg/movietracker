import { Routes, Route } from "react-router-dom";
import WatchHistoryPage from "./pages/WatchHistory";
import MoviePage from "./pages/Movie";
import DefaultLayout from "./layouts/DefaultLayout";
import "./App.scss";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadMovies } from "./redux/moviesSlice";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadMovies());
    }, []);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<Fragment />} />
                    <Route path="watched">
                        <Route index element={<WatchHistoryPage />} />
                        <Route path=":id" element={<MoviePage />} />
                    </Route>
                    <Route path="waitlist" element={<Fragment />} />
                </Route>
            </Routes>
            <ToastContainer />
        </div>
    );
}

export default App;
