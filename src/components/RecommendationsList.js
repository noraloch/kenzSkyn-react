import React from "react";
import RecommendedProduct from "./RecommendedProduct";

function recommendationsList({ productsState, currentUser, recomendationsState }) {
    let recommendationComponent = null;
    // Only render when there are recommendations
    if (recomendationsState.length > 0) {
        // Then - find the products for the products listed in recommendedState
        let recommendedProducts = productsState.filter(product => {
            recomendationsState.forEach(recommendation => {
                return product.id === recommendation.id;
            });
        }).map(product => {
            // Map over recommended products to get corresponding recommendation data
            recomendationsState.forEach(recommendation => {
                if(product.id === recommendation.id) {
                    return {product, recommendation}
                }
            })
        })

        if (recommendedProducts.length > 0) {
            recommendationComponent = recommendedProducts.map(pair => <RecommendedProduct recommendedObj={pair.recommendation} productObj={pair.product} key={pair.product.id} currentUser={currentUser} />);
        }

    }
    // {productsState.length > 0 && currentUser.oily_skin !== undefined ? productsState.map(p => <RecommendedProduct recommendedObj={r} productObj={p} key={p.id} currentUser={currentUser} />) : null}
    return(
        <>
        {recommendationComponent}
        </>
    )

};

export default recommendationsList;