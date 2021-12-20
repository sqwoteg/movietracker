import React from "react";
import WatchHistoryTableRow from "./WatchHistoryTableRow";
import "./watchHistoryTable.scss";

const WatchHistoryTable = ({ movies, onMovieCheckboxChange }) => {
    return (
        <table className="table w-full">
            <thead>
                <tr>
                    <th></th>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Genre</th>
                    <th>Year</th>
                    <th>Mark</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {movies.map((movie) => (
                    <WatchHistoryTableRow
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        type={"movie"}
                        genres={movie.genres}
                        year={movie.year}
                        mark={movie.mark}
                        onMovieCheckboxChange={onMovieCheckboxChange}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default WatchHistoryTable;
