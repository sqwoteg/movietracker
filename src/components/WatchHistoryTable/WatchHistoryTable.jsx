import React, { useState } from "react";
import WatchHistoryTableRow from "./WatchHistoryTableRow";
import "./watchHistoryTable.scss";
import WatchHistoryTableSortableHeader from "./WatchHistoryTableSortableHeader";

const WatchHistoryTable = ({ movies, onMovieCheckboxChange }) => {
    const [sortBy, setSortBy] = useState("id");
    const [descending, setDescending] = useState(false);

    const onHeaderClick = (newSortBy) => {
        if (sortBy === newSortBy) setDescending((descending) => !descending);
        else setSortBy(newSortBy);
    };

    return (
        <table className="table w-full">
            <thead>
                <tr>
                    <th></th>
                    <WatchHistoryTableSortableHeader
                        currentSortBy={sortBy}
                        ownSortBy="id"
                        text="ID"
                        descending={descending}
                        onClick={onHeaderClick}
                    />
                    <WatchHistoryTableSortableHeader
                        currentSortBy={sortBy}
                        ownSortBy="title"
                        text="Title"
                        descending={descending}
                        onClick={onHeaderClick}
                    />
                    <th>Type</th>
                    <th>Genre</th>
                    <WatchHistoryTableSortableHeader
                        currentSortBy={sortBy}
                        ownSortBy="year"
                        text="Year"
                        descending={descending}
                        onClick={onHeaderClick}
                    />
                    <WatchHistoryTableSortableHeader
                        currentSortBy={sortBy}
                        ownSortBy="mark"
                        text="Mark"
                        descending={descending}
                        onClick={onHeaderClick}
                    />
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {[]
                    .concat(movies)
                    .filter((movie) => movie.watched === true)
                    .sort((a, b) => {
                        let result = 0;
                        if (typeof a[sortBy] === "string") {
                            if (
                                (a[sortBy] || "").toLowerCase() <
                                (b[sortBy] || "").toLowerCase()
                            ) {
                                result = -1;
                            } else {
                                result = 1;
                            }
                        } else if (typeof a[sortBy] === "number") {
                            result = (a[sortBy] || 0) - (b[sortBy] || 0);
                        }
                        result *= descending ? -1 : 1;
                        return result;
                    })
                    .map((movie) => (
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

WatchHistoryTable.defaultProps = {
    sortBy: "id",
    descending: false,
};

export default WatchHistoryTable;
