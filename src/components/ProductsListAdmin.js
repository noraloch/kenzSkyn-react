import React from "react";
import ProductItemAdmin from "./ProductItemAdmin";


function ProductsListAdmin ({ adminProducts }){
    let productComp = adminProducts.map(p => <ProductItemAdmin key={p.id} productObj={p} />)
    return (
        <div>
            {productComp}
        </div>
    )
}

export default ProductsListAdmin;
