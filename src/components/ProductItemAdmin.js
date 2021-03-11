import React from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';





function ProductItemAdmin({ productObj }) {
    let { name, category, brand, image, description, link, skin_attribute } = productObj;


    return (
        <Card style={{ width: '18rem' }}>

            <Card.Img style={{ width: '20vw', height: '35vh' }} variant="top" src={image} alt={name} /><br />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Title>{category} || brand: {brand}</Card.Title>
                <a href={link} >View Product Website Page</a>
                <Card.Text><h5>Description:</h5>{description}<h6>{skin_attribute}</h6> </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ProductItemAdmin;
