import React from "react"

const Navbar = ({ setActiveTab }) => {
    return (
        <div>
            <button onClick={() => setActiveTab("text")}>
                Creative Studio
            </button>
            <button onClick={() => setActiveTab("image")}>
                Style Lab
            </button>
        </div>
    );
}

export default Navbar;