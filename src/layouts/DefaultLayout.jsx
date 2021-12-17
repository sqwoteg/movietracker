import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const DefaultLayout = (props) => {
    return (
            <div className="default-layout">
                <div className="layout-header">
                    <Header />
                </div>
                <div className="layout-content">
                    <Outlet />
                </div>
            </div>
    );
};

export default DefaultLayout;
