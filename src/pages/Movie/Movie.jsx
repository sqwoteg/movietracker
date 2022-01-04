import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { selectMovie, setMovieMark } from "../../redux/moviesSlice";
import { Rating } from "react-simple-star-rating";
import axios from "axios";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import "./movie.scss";

const MoviePage = () => {
    const { id } = useParams();
    const movie = useSelector(selectMovie(+id));
    const dispatch = useDispatch();

    const [posterURL, setPosterURL] = useState(null);
    const [posterLoaded, setPosterLoaded] = useState(false);

    useEffect(() => {
        if (!movie) return;
        axios
            .get(
                `https://www.omdbapi.com/?t=${encodeURIComponent(
                    movie.title
                )}&apikey=365e8c1a`
            )
            .then((r) => {
                if (r.data.Poster) setPosterURL(r.data.Poster);
                else setPosterLoaded(null);
            })
            .catch(() => {
                setPosterLoaded(null);
            });
    }, [movie]);

    return (
        <div className="page page--movie">
            <div className="screen-width-limiter grid grid-cols-4 gap-6">
                <div className="poster">
                    <figure>
                        {!posterLoaded && <Skeleton className="poster-skeleton" enableAnimation={posterLoaded !== null} />}
                        <img src={posterURL} onLoad={() => setPosterLoaded(true)} onError={() => setPosterLoaded(null)} />
                    </figure>
                </div>
                {movie && (
                    <div className="card bg-base-100 col-span-3 py-4 px-6">
                        <div className="card-title text-2xl mb-0">
                            {movie.title}
                        </div>
                        <div className="mark inline-block absolute top-4 right-6">
                            <Rating
                                onClick={(mark) =>
                                    dispatch(setMovieMark({ id, mark }))
                                }
                                ratingValue={movie.mark || 50}
                            />
                        </div>
                        <div className="badges">
                            {movie.genres.map((g) => (
                                <div key={g} className="badge mr-1">{g}</div>
                            ))}
                        </div>
                        {movie.comments && (
                            <div className="comment mt-4">
                                Your comments:
                                <div className="comment-box">
                                    {movie.comments}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MoviePage;
