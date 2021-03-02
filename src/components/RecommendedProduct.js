import React from "react";

function RecommendedProduct({ productObj, recommendedObj }) {
    let { id, name, category, image, description, link } = productObj;
    let rId = recommendedObj.id;

    function handleClick() {
        let savedObj = {
            saved: true,
        }
        //fetch patch the saved boolean
        fetch(`http://localhost:3000/recommendations/${rId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(savedObj),
        })

    };

    return (
        <>
            <div>
                <h3>Your best match {category} is: {name}</h3>
                <h5>Description: </h5><p>{description}</p>
                <a href={link} >View full details</a>
                {recommendedObj.saved ? <h4>Saved</h4> :
                    <button onClick={handleClick} >Save Recommendation</button>
                }
                <img src={image} alt={name} />
            </div>
        </>
    )
};

export default RecommendedProduct;