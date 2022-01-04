import React, { Fragment, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addMovie, editMovie, selectMovie } from "../../redux/moviesSlice";
import useForm from "../../hooks/useForm";
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
    const movieValues = Object.assign(
        {
            title: "",
            genres: "",
            year: "",
            comments: "",
            watched: true,
        },
        movie
    );
    if (Array.isArray(movieValues.genres))
        movieValues.genres = movieValues.genres.join(", ");

    useEffect(() => {
        if (movieID && !movie) {
            toast.error("Cound not find movie with ID " + movieID);
        }
    }, []);

    const dispatch = useDispatch();

    const submit = () => {
        let values = Object.assign({}, data);
        values.genres = values.genres.split(", ");

        if (movie) {
            // editing
            dispatch(editMovie({ id: movieID, movie: values }));
        } else {
            // creating new
            dispatch(addMovie(values));
        }
        close();
    };

    const { handleSubmit, handleChange, data } = useForm({
        initialValues: movieValues,
        validations: {
            title: {
                required: {
                    value: true,
                    message: "This field is required",
                },
            },
            genres: {
                required: {
                    value: true,
                    message: "This field is required",
                },
            },
            year: {
                pattern: {
                    value: "^$|^(18|19|20)\\d{2}$",
                    message: "Enter a valid year",
                },
            },
        },
        onSubmit: submit,
        onErrors: (errs) => {
            for (let err of Object.entries(errs))
                toast.error(`${err[0]}: ${err[1]}`);
        },
    });

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
                            onChange={handleChange("title")}
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
                            onChange={handleChange("genres")}
                            name="genres"
                        />
                        <TextInputComponent
                            label="Year"
                            placeholder="1984"
                            defaultValue={movie && movie.year ? movie.year : ""}
                            type="number"
                            onChange={handleChange("year")}
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
                            onChange={handleChange("comments")}
                            name="comments"
                        />
                        <div className="checkbox-row">
                            <label className="cursor-pointer label">
                                <input
                                    name="watched"
                                    type="checkbox"
                                    className="checkbox opacity-60"
                                    defaultChecked={true}
                                    onChange={handleChange("watched")}
                                />
                                <span className="label-text">
                                    I have already watched this film
                                </span>
                            </label>
                        </div>
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
