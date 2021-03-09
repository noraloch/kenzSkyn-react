import React from "react";
import RecommendedProduct from "./RecommendedProduct";

function recommendationsList({ productsMain, currentUser, recommendationsState, onSaveRec }) {
    let recommendationComponent = null;
    // Then - find the products for the products listed in recommendedState
    let recommendedProducts = [];
    console.log(productsMain)
    productsMain.map(product => {
        // Map over recommended products to get corresponding recommendation data
        recommendationsState.forEach(recommendation => {
            if (product.id === recommendation.product_id) {
                recommendedProducts.push({ product, recommendation });
            }
        })
    });
console.log(recommendedProducts);
    recommendationComponent = recommendedProducts.map(pair => <RecommendedProduct recommendedObj={pair.recommendation} productObj={pair.product} key={pair.product.id} currentUser={currentUser} onSaveRec={onSaveRec} />)

    return (
        <>
            {recommendationComponent}
        </>
    )

};

export default recommendationsList;