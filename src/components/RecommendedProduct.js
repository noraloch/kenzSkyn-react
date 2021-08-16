import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';



function RecommendedProduct({ productObj, recommendedObj }) {
    let { name, category, image, description, link } = productObj;
    let rId = recommendedObj.id;
    const [savedState, setSavedState] = useState(false);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_RAILS_URL}/recommendations/${rId}`)
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
        fetch(`${process.env.REACT_APP_RAILS_URL}/recommendations/${rId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(savedObj),
        })
            .then(() => { setSavedState(true) })

    };

    return (
        <Card style={{ width: '55rem', padding:"10px", border:"none", borderRadius: "15px", padding: "20px", boxShadow: "10px 10px 42px 0px rgba(103, 98, 98, 0.75)", marginBottom: "10px" }}>
                <h3>{name}</h3>
                <h5>Description: </h5><p>{description}</p>
                <a href={link} >View full details</a><br></br>
                {savedState ? <h4>✓</h4> :
                    <button style={{ width: "120px"}} onClick={handleClick}>{savedState ? null : "Save Product"}</button>
                }
                <img style={{ width: '38vw', height: '54vh', padding:"5px", border:"none", borderRadius: "8px", boxShadow: "5px 5px 20px 5px rgba(50, 40, 40, 0.4)", margin: "20px" }} src={image} alt={name} />
        </Card>
    )
};

export default RecommendedProduct;