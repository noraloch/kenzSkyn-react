import React from "react";
import RecommendedProduct from "./RecommendedProduct";

function recommendationsList({ productsMain, currentUser, recommendationsState }) {
    let recommendationComponent = null;
    // Then - find the products for the products listed in recommendedState
    let recommendedProducts = [];
    productsMain.map(product => {
        // Map over recommended products to get corresponding recommendation data
        recommendationsState.forEach(recommendation => {
            if (product.id === recommendation.id) {
                recommendedProducts.push({ product, recommendation });
            }
        })
    });
    console.log(recommendedProducts);

    if (recommendedProducts.length > 0) {
        recommendationComponent = recommendedProducts.map(pair => <RecommendedProduct recommendedObj={pair.recommendation} productObj={pair.product} key={pair.product.id} currentUser={currentUser} />)
    };
    
    return (
        <>
            {recommendationComponent}
        </>
    )

};

export default recommendationsList;