import React from "react";
import ProductItemAdmin from "./ProductItemAdmin";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';






function ProductsListAdmin({ adminProducts }) {
    let productComp = adminProducts.map(p => <ProductItemAdmin key={p.id} productObj={p} />)
    return (
        <Container>
            <Row>
                {productComp}
            </Row>
        </Container>
    )
}

export default ProductsListAdmin;
