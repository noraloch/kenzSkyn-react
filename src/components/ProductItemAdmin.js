import React from "react";


function ProductItemAdmin({ productObj }){
    let {name, category, brand, image, description, link, skin_attribute} = productObj;


    return (
        <div>
            <h3>{name}</h3>
            <h5>{category} || brand: {brand}</h5>
            <img src={image} alt={name} />
            <a href={link} >View Product Website Page</a>
            <p>{description}</p><h6>{skin_attribute}</h6>
        </div>
    )
}

export default ProductItemAdmin;
