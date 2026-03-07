import React from "react";
import "./Loader.css";

export default function Loader({ type = "threeBounce" }) {
    return (
        <div className="loader-container">
            <div className="loader">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div>
        </div>
    );
}
