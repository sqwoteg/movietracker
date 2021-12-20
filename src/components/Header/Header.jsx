import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";

const Header = () => {
    return (
        <header className={"header"}>
            <div className="max-width-container">
                <div className="row">
                    <Link to="/">
                        <div className="logo">movietracker</div>
                    </Link>
                </div>
                <div className="row">
                    <Link className="btn btn-xs btn-link" to="/watched">
                        watched
                    </Link>
                    <Link className="btn btn-xs btn-link" to="/waitlist">
                        waitlist
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
