import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function RecommendedProduct({ productObj, recommendedObj }) {
    let { name, category, image, description, link } = productObj;
    let rId = recommendedObj.id;
    const [savedState, setSavedState] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3000/recommendations/${rId}`)
            .then(r => r.json())
            .then((recObj) => {
                if (recObj.saved) {
                    setSavedState(true)
                }
            })
    }, []);
    console.log(savedState)

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
            .then(() => { setSavedState(true) })

    };

    return (
        <>
            <div>
                <h3>Your best match {category} is: {name}</h3>
                <h5>Description: </h5><p>{description}</p>
                <a href={link} >View full details</a>
                {savedState ? <h4>✓</h4> :
                    <button onClick={handleClick}>{savedState ? null : "Save Product"}</button>
                }
                <img src={image} alt={name} />
            </div>
        </>
    )
};

export default RecommendedProduct;