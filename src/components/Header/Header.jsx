import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";

const Header = () => {
    return (
        <header className={"header"}>
            <div className="max-width-container">
                <div className="app-logo-row">
                    <Link to="/">
                        <div className="app-logo-row__logo">movietracker</div>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;