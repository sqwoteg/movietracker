import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { setMovieMark } from "../../redux/moviesSlice";

const WatchHistoryTableRow = ({
    id,
    title,
    type,
    genres,
    year,
    mark,
    onMovieCheckboxChange,
}) => {
    const dispatch = useDispatch();

    return (
        <tr className="no-td-hover-bg hover:bg-gray-100">
            <th>
                <input
                    type="checkbox"
                    className="checkbox block"
                    onChange={(e) =>
                        onMovieCheckboxChange(id, e.target.checked)
                    }
                />
            </th>
            <td>{id}</td>
            <td>{title}</td>
            <td>{type}</td>
            <td>{genres.map((g) => (
                                <div key={g} className="badge mr-1">{g}</div>
                            ))}</td>
            <td>{year}</td>
            <td>
                <Rating
                    onClick={(mark) => dispatch(setMovieMark({ id, mark }))}
                    ratingValue={mark || 50}
                />
            </td>
            <td>
                <Link to={`${id}`} className="btn btn-xs btn-ghost">
                    details
                </Link>
            </td>
        </tr>
    );
};

export default WatchHistoryTableRow;
