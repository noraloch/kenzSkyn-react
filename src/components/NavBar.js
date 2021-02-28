import React from "react";
import { Link } from "react-router-dom";


function NavBar({ currentUser }) {

    return (
        <div className="navbar">
            <Link to="/home" className="logo"><img style={{ size: "200px" }} className="logo" src="../logo.png" alt="logo" /></Link>
            { currentUser ? (
                <>
                    <div className="right-links">
                        <div className="welcome" > Welcome, {currentUser.first_name}! </div>
                        <Link to="/home" className="link">Home</Link>
                        <Link to="/profile" className="link">Profile</Link>
                    </div>
                </>
            )
                : (
                    <>
                        <div className="right-links">
                            <Link to="/home" className="link">Home</Link>
                            <Link to="/login" className="link">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    </>
                )
            }
        </div>
    );
}

export default NavBar;