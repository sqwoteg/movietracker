import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectMovie } from "../../redux/moviesSlice";
import axios from "axios";
import "./movie.scss";

const MoviePage = () => {
    const { id } = useParams();
    const movie = useSelector(selectMovie(+id));

    const [posterURL, setPosterURL] = useState(null);

    useEffect(() => {
        if (!movie) return;
        axios
            .get(
                `https://www.omdbapi.com/?t=${encodeURIComponent(
                    movie.title
                )}&apikey=365e8c1a`
            )
            .then((r) => {
                setPosterURL(r.data.Poster);
                console.log(r);
            });
    }, [movie]);

    return (
        <div className="page page--movie">
            <div className="screen-width-limiter grid grid-cols-4 gap-6">
                <div className="card bg-base-100">
                    <figure>
                        <img src={posterURL} />
                    </figure>
                </div>
                {movie && (
                    <div className="card bg-base-100 col-span-3 py-4 px-6">
                        <div className="card-title text-2xl mb-0">
                            {movie.title}
                        </div>
                        <div className="badges">
                            {movie.genres.map((g) => (
                                <div class="badge mr-1">{g}</div>
                            ))}
                        </div>
                        {
                            movie.comments &&
                            <div className="comment mt-4">
                                Your comments:
                                <div className="comment-box">{movie.comments}</div>
                            </div>
                        }
                    </div>
                )}
            </div>
        </div>
    );
};

export default MoviePage;
