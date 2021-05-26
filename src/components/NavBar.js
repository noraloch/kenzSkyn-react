import React from "react";
import { Link } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';


function NavBar({ currentUser, logout }) {
    let nav = null;

    // <nav class="navbar navbar-expand-lg navbar-light bg-light">
    //     <a class="navbar-brand" href="#">Navbar</a>
    //     <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    //         <span class="navbar-toggler-icon"></span>
    //     </button>
    //     <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    //         <div class="navbar-nav" >
    //             <a class="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
    //             <a class="nav-item nav-link" href="#">Features</a>
    //             <a class="nav-item nav-link" href="#">Pricing</a>
    //             <a class="nav-item nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
    //         </div>
    //     </div>
    // </nav>

    if (currentUser) {
        if (currentUser.username === "NL") {
            nav =
                <>
                    <a class="navbar-brand"><Link to="/available-products" ><img style={{ size: "180px" }} className="logo" src="../logo.png" alt="logo" /><Badge variant="secondary" style={{ backgroundColor: "pink", color: "fuchsia" }}>Admin</Badge></Link></a>
                    <div style={{ marginLeft: "38%" }}>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav">
                                <a class="nav-item nav-link"><Link to="/new-product">Add Product</Link></a>
                                <a class="nav-item nav-link"><Link to="/available-products">All Products</Link></a>
                                <a class="nav-item nav-link"><button onClick={logout}>Logout</button></a>
                            </div>
                        </div>
                    </div>
                </>
        } else {
            nav =
                <>
                    <a class="navbar-brand"><Link to="/home"><img style={{ size: "180px" }} className="logo" src="../logo.png" alt="logo" /></Link></a>
                    <div style={{ marginLeft: "48%" }}>
                        <div className="welcome" > Welcome, {currentUser.first_name}! </div>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav">
                                <a class="nav-item nav-link"><Link to="/home" className="link">Home</Link></a>
                                <a class="nav-item nav-link"><Link to="/profile" className="link">Profile</Link></a>
                                <a class="nav-item nav-link"><Link to="/quiz" className="link">Quiz</Link></a>
                                <a class="nav-item nav-link"><button onClick={logout}>Logout</button></a>
                            </div>
                        </div>
                    </div>
                </>
        }
    } else {
        nav = <>
            <a class="navbar-brand"><Link to="/home"><img style={{ size: "180px" }} className="logo" src="../logo.png" alt="logo" /></Link></a>
            <div style={{ marginLeft: "48%" }}>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-item nav-link"><Link to="/home" className="link">Home</Link></a>
                        <a class="nav-item nav-link"><Link to="/login" className="link">Login</Link></a>
                        <a class="nav-item nav-link"><Link to="/signup" className="link">Signup</Link></a>
                    </div>
                </div>
            </div>
        </>
    };

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            {nav}
        </nav>
    );
}

export default NavBar;