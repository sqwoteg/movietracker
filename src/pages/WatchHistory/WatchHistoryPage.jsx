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
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                        </tr>
                        <tr>
                            <th>2</th>
                            <td>Hart Hagerty</td>
                            <td>Desktop Support Technician</td>
                            <td>Purple</td>
                        </tr>
                        <tr>
                            <th>3</th>
                            <td>Brice Swyre</td>
                            <td>Tax Accountant</td>
                            <td>Red</td>
                        </tr>
                        <tr>
                            <th>4</th>
                            <td>Marjy Ferencz</td>
                            <td>Office Assistant I</td>
                            <td>Crimson</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CreateProductPage;
