import React from "react";


function ProductItemAdmin({ productObj }){
    let {name, category, brand, image, description, skin_attribute} = productObj;


    return (
        <div>
            <h3>{name}</h3>
            <h5>{category} || {brand}</h5>
            <img src={image} alt={name} />
            <p>{description}</p><h6>{skin_attribute}</h6>
        </div>
    )
}

export default ProductItemAdmin;
