import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence } from "framer-motion";
import {
    loadMovies,
    saveMovies,
    selectMovies,
    selectMovie,
    removeMovies,
} from "../../redux/moviesSlice";
import WatchHistoryTable from "../../components/WatchHistoryTable";
import AddEditMovieModal from "../../components/AddEditMovieModal";
import "./watchHistoryPage.scss";

const WatchHistoryPage = () => {
    const movies = useSelector(selectMovies);
    const dispatch = useDispatch();

    const [movieEdit, setMovieEdit] = useState(null);
    const [movieAddModal, setMovieAddModal] = useState(false);
    const [selectedMovies, setSelectedMovies] = useState([]);

    const onMovieCheckboxChange = (id, checked) => {
        if (checked) {
            setSelectedMovies([...selectedMovies, id]);
        } else {
            setSelectedMovies(selectedMovies.filter((i) => i !== id));
        }
    };

    const deleteSelectedMovies = () => {
        dispatch(removeMovies({ ids: selectedMovies }));
        setSelectedMovies([]);
    }

    return (
        <div className="page page--watch-history">
            <div className="screen-width-limiter">
                <div className="controls-wrapper">
                    <div className="btn-group inline-block">
                        {/* <button
                            className="btn btn-xs"
                            onClick={() =>
                                dispatch(
                                    addMovie({
                                        title: "test",
                                        genres: ["1", "2"],
                                        year: 2012,
                                    })
                                )
                            }
                        >
                            Add
                        </button> */}
                        <button
                            disabled={selectedMovies.length > 0 ? false : true}
                            onClick={deleteSelectedMovies}
                            className="btn btn-xs modal-button"
                        >
                            Delete
                        </button>
                        <button
                            disabled={
                                selectedMovies.length === 1 ? false : true
                            }
                            onClick={() => setMovieEdit(selectedMovies[0])}
                            className="btn btn-xs modal-button"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => setMovieAddModal(true)}
                            className="btn btn-xs modal-button"
                        >
                            Add
                        </button>
                    </div>
                    <div className="btn-group inline-block float-right">
                        {/* <button
                            className="btn btn-xs"
                            onClick={() =>
                                dispatch(
                                    addMovie({
                                        title: "test",
                                        genres: ["1", "2"],
                                        year: 2012,
                                    })
                                )
                            }
                        >
                            Add
                        </button> */}
                        <button
                            // disabled={selectedMovies.length === 1 ? false : true}
                            onClick={() => dispatch(saveMovies(movies))}
                            className="btn btn-xs modal-button"
                        >
                            Save
                        </button>
                        <button
                            // disabled={selectedMovies.length === 1 ? false : true}
                            onClick={() => dispatch(loadMovies())}
                            className="btn btn-xs modal-button"
                        >
                            Load
                        </button>
                    </div>
                </div>

                <div className="table-wrapper">
                    <WatchHistoryTable
                        movies={movies}
                        onMovieCheckboxChange={onMovieCheckboxChange}
                    />
                </div>
            </div>
            <AnimatePresence>
                {movieEdit && (
                    <AddEditMovieModal
                        movieID={movieEdit}
                        close={() => setMovieEdit(null)}
                    />
                )}
                {movieAddModal && (
                    <AddEditMovieModal
                        movie={null}
                        close={() => setMovieAddModal(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default WatchHistoryPage;
