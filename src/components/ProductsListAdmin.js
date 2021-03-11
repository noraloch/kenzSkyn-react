import React from "react";
import ProductItemAdmin from "./ProductItemAdmin";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';






function ProductsListAdmin({ adminProducts }) {
    // let productComp = adminProducts.map(p => <ProductItemAdmin key={p.id} productObj={p} />)
    return (
        <Container fluid>
            {adminProducts.length === 0 ? <img style={{ marginLeft: "18%", marginTop: "5%" }} src="https://www.parcon-india.com/m/images/giphy.gif" alt="loading" /> :
                <Row>
                    {adminProducts.map(p => <ProductItemAdmin key={p.id} productObj={p} />)}
                </Row>
            }
        </Container>
    )
}

export default ProductsListAdmin;
