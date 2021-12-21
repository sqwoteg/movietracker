import React from "react";
import classNames from "classnames";

const WatchHistoryTableSortableHeader = ({
    currentSortBy,
    descending,
    ownSortBy,
    onClick,
    text,
}) => {
    return (
        <th>
            <span className="cursor-pointer" onClick={() => onClick(ownSortBy)}>
                {text}
                <span
                    className={classNames("text-[10px]", "align-top", {
                        invisible: currentSortBy !== ownSortBy,
                    })}
                >
                    {descending ? " ▼" : " ▲"}
                </span>
            </span>
        </th>
    );
};

export default WatchHistoryTableSortableHeader;
