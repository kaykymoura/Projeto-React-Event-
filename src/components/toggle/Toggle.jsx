import React from "react";
import "./Toggle.css"

const Toggle = () => {
    return (
        <>
            <div className="teste">
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                </label>
            </div>
        </>
    )
}

export default Toggle;