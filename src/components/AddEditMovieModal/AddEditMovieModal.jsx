import React, { Fragment, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addMovie, editMovie, selectMovie } from "../../redux/moviesSlice";
import useForm from "../../hooks/useMovieForm";
import TextInputComponent from "../TextInputComponent/TextInputComponent";
import "./addEditMovieModal.scss";
import { toast } from "react-toastify";

const AddEditMovieModal = ({ movieID, close }) => {
    const modalMotion = {
        initial: { y: -20, opacity: 0 },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                delay: 0.1,
                duration: 0.1,
            },
        },
    };
    const outMotion = {
        initial: { opacity: 0 },
        animate: {
            y: 0,
            opacity: 0.5,
            transition: {
                duration: 0.1,
            },
        },
    };

    const movie = useSelector(selectMovie(movieID));

    useEffect(() => {
        if (movieID && !movie) {
            toast.error("Cound not find movie with ID " + movieID);
        }
    }, []);

    const dispatch = useDispatch();

    const submit = () => {
        let newValues = {
            ...movie,
            ...values
        };
        newValues.genres = Array.isArray(newValues.genres) ? newValues.genres : newValues.genres.split(", ");

        if (movie) {
            // editing
            dispatch(editMovie({ id: movieID, movie: newValues }));
        } else {
            // creating new
            dispatch(addMovie(newValues));
        }
        close();
    };

    const err = (errors) => {
        if (Object.keys(errors).length === 0) toast.error("You didn't change any values");
        else toast.error(errors);
    }

    const { handleChange, values, errors, handleSubmit } = useForm(submit, err);

    return (
        <Fragment>
            <motion.div
                className="modal-wrapper"
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={outMotion}
                    className="modal-out"
                    onClick={close}
                ></motion.div>
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={modalMotion}
                    className="modal-box modal-form"
                >
                    {movie ? (
                        <>
                            <div className="modal-form__title">Edit movie</div>
                            <div className="modal-form__subtitle">
                                edit movie from the list
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="modal-form__title">Add movie</div>
                            <div className="modal-form__subtitle">
                                add movie to the list
                            </div>
                        </>
                    )}

                    <div className="max-w-s m-auto">
                        <TextInputComponent
                            label="Title"
                            placeholder="The Terminator"
                            defaultValue={
                                movie && movie.title ? movie.title : ""
                            }
                            onChange={handleChange}
                            name="title"
                        />
                        <TextInputComponent
                            label="Genres"
                            placeholder="action, thriller, horror, science fiction"
                            defaultValue={
                                movie && movie.genres
                                    ? movie.genres.join(", ")
                                    : ""
                            }
                            onChange={handleChange}
                            name="genres"
                        />
                        <TextInputComponent
                            label="Year"
                            placeholder="1984"
                            defaultValue={movie && movie.year ? movie.year : ""}
                            type="number"
                            onChange={handleChange}
                            name="year"
                        />
                        <TextInputComponent
                            label="Your comments"
                            placeholder="Comments"
                            multiline
                            defaultValue={
                                movie && movie.comments ? movie.comments : ""
                            }
                            type="number"
                            onChange={handleChange}
                            name="comments"
                        />
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-ghost" onClick={close}>
                            Cancel
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </Fragment>
    );
};

export default AddEditMovieModal;
