import React from "react";
import { Link } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';



function NavBar({ currentUser, logout }) {
    let nav = null;
    if (currentUser) {
        if (currentUser.username === "NL") {
            nav = <div>
                <Link to="/available-products" className="logo"><img style={{ size: "200px" }} className="logo" src="../logo.png" alt="logo" /><Badge variant="secondary" style={{ backgroundColor: "pink", color:"fuchsia"}}>Admin</Badge></Link>
                <div className="right-links" style={{marginLeft: "950px"}}>
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
            <div className="right-links" style={{marginLeft: "900px"}}>
                <Link to="/home" className="link">Home</Link>
                <Link to="/login" className="link">Login</Link>
                <Link to="/signup" className="link">Signup</Link>
            </div>
        </div>
    };

    return (
        <Nav fill variant="tabs" style={{backgroundColor: "#adc7b6"}}>
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
        </Nav>
    );
}

export default NavBar;