import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <div>
                <h2>What is KenZkYn?</h2>
                <p>Using the quiz approach, KenZkYn helps user pick product that are best for them.</p>
                <p>It recommends products based on matching ingredients that are in the product with the ingredients user’s skin requires.</p>
                <button style={{ width:"auto" }}>
                <Link to="/quiz" style={{ color:"white", textDecoration:"none" }}>Take our 20 second quiz now </Link>
                </button>
            </div>

        </div>
    )
}

export default Home;