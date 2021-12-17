import React from "react";
import "./watchHistoryPage.scss";

const CreateProductPage = () => {
    return (
        <div className="page page--watch-history">
            <div className="rounded max-w-screen-lg m-auto bg-white rounded-3xl overflow-hidden">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Year</th>
                            <th>Mark</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th></th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CreateProductPage;
