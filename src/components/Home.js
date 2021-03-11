import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <div>
                <h2>What is KenZkYn?</h2>
                <p>Using a quiz approach, KenZkYn helps users find products that are best for them based on their specific skin types, needs and lifestyle.</p>
                <p>It recommends products by matching their ingredients with the ingredients that the user needs.</p>
                <button style={{ width:"auto" }}>
                <Link to="/quiz" style={{ color:"white", textDecoration:"none" }}>Take our 20 second quiz now </Link>
                </button>
            </div>

        </div>
    )
}

export default Home;