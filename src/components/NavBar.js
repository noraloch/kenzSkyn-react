import React from "react";
import { Link } from "react-router-dom";


function NavBar({ currentUser, logout }) {

  
    let nav = null;
    if (currentUser) {
        if (currentUser.username === "NL") {
            nav = <div>
                <Link to="/available-products" className="logo"><img style={{ size: "200px" }} className="logo" src="../logo.png" alt="logo" /></Link>
                <h3 style={{color:"pink"}}>Admin</h3>
                <div className="right-links">
                    <Link to="/new-product" className="link" >Add Product</Link>
                    <Link to="/available-products" className="link" >All Products</Link>
                    <button onClick={logout}>Logout</button>
                </div>
            </div>
        } else {
            nav = <div>
                <Link to="/home" className="logo"><img style={{ size: "200px" }} className="logo" src="../logo.png" alt="logo" /></Link>
                <div className="right-links">
                    <div className="welcome" > Welcome, {currentUser.first_name}! </div>
                    <Link to="/home" className="link">Home</Link>
                    <Link to="/profile" className="link">Profile</Link>
                    <Link to="/quiz" className="link">Quiz</Link>
                    <button onClick={logout}>Logout</button>
                </div>
            </div>
        }
    } else {
        nav = <div>
            <Link to="/home" className="logo"><img style={{ size: "200px" }} className="logo" src="../logo.png" alt="logo" /></Link>
            <div className="right-links">
                <Link to="/home" className="link">Home</Link>
                <Link to="/login" className="link">Login</Link>
                <Link to="/signup" className="link">Signup</Link>
            </div>
        </div>
    };

    return (
        <div className="navbar">
            {nav}
        
            {/* { currentUser ? (
                <>
                    <Link to="/home" className="logo"><img style={{ size: "200px" }} className="logo" src="../logo.png" alt="logo" /></Link>
                    <div className="right-links">
                        <div className="welcome" > Welcome, {currentUser.first_name}! </div>
                        <Link to="/home" className="link">Home</Link>
                        <Link to="/profile" className="link">Profile</Link>
                        <Link to="/quiz" className="link">Quiz</Link>
                    </div>
                </>
            )
                : (
                    <>
                        <Link to="/home" className="logo"><img style={{ size: "200px" }} className="logo" src="../logo.png" alt="logo" /></Link>
                        <div className="right-links">
                            <Link to="/home" className="link">Home</Link>
                            <Link to="/login" className="link">Login</Link>
                            <Link to="/signup" className="link">Signup</Link>
                        </div>
                    </>
                )
            } */}
        </div>
    );
}

export default NavBar;