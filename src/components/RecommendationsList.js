import React from "react";
import RecommendedProduct from "./RecommendedProduct";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function recommendationsList({ productsMain, currentUser, recommendationsState, onSaveRec }) {
    let recommendationComponent = null;
    // Then - find the products for the products listed in recommendedState
    let recommendedProducts = [];

    productsMain.map(product => {
        // Map over recommended products to get corresponding recommendation data
        recommendationsState.forEach(recommendation => {
            if (product.id === recommendation.product_id) {
                recommendedProducts.push({ product, recommendation });
            }
        })
    });
    // console.log(recommendedProducts);
    recommendationComponent = recommendedProducts.map(pair => <RecommendedProduct recommendedObj={pair.recommendation} productObj={pair.product} key={pair.product.id} currentUser={currentUser} onSaveRec={onSaveRec} />)

    return (
        <Container fluid >
            {recommendationsState.length === 0 || productsMain.length === 0 ? <img style={{marginLeft:"18%", marginTop:"5%"}} src="https://www.parcon-india.com/m/images/giphy.gif" alt="loading"/>: 
            <Row>
                <Col>{recommendationComponent}</Col>
            </Row>
            }
        </Container>

    )

};

export default recommendationsList;