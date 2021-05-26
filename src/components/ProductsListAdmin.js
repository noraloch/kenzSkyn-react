import React from "react";
import {useEffect} from "react";
import ProductItemAdmin from "./ProductItemAdmin";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


function ProductsListAdmin({ adminProducts, setAdminProducts }) {

    useEffect(() => {
            fetch("http://localhost:3000/products")
                .then((r) => r.json())
                .then((productsArr) => setAdminProducts(productsArr))
    }, []);

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
