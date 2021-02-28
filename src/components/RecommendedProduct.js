import React from "react";

function RecommendedProduct({ productObj }){ 
    console.log('ji')
    if (!productObj){
        return <h2>Please take the quiz in order to see your recomendations</h2>
    }
    let {name, category, image, description, link} = productObj;

    return (
        <>
            <div>
                <h3>Your best match {category} is: {name}</h3>
                <h5>Description: </h5><p>{description}</p>
                <a href={link} >View full details</a>
                <button>Save Recommendation</button>
                <img src={image} alt={name} />
            </div>
        </>
    )
};

export default RecommendedProduct;