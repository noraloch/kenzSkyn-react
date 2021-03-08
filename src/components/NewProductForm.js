import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function NewProductForm({ onAddProduct }) {
    const history = useHistory();

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [ingredient1, setIngredient1] = useState("");
    const [ingredient2, setIngredient2] = useState("");
    const [ingredient3, setIngredient3] = useState("");
    const [ingredient4, setIngredient4] = useState("");
    const [description1, setDescription1] = useState("");
    const [description2, setDescription2] = useState("");
    const [description3, setDescription3] = useState("");
    const [description4, setDescription4] = useState("");


    const newProduct = {
        name: name,
        category: category,
        brand: brand,
        image: image,
        description: description,
        link: link
    };
    const newIngredientsArray = [{ ingredient1, description1 }, { ingredient2, description2 }, { ingredient3, description3 }, { ingredient4, description4 }];

    function createRequestionOptions(methodType, data) {
        return {
            method: methodType,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
    };

    function handleSubmit(event) {
        event.preventDefault()
        let postProductsPromise = fetch('http://localhost:3000/products', createRequestionOptions('POST', newProduct));
        let ingredientsPromises = newIngredientsArray.map((ingredient, i) => {
            let num = i + 1;
            let nameKey = "ingredient" + num;
            let descKey = "description" + num;

            let ingredientForDB = {
                name: ingredient[nameKey],
                short_description: ingredient[descKey]
            }

            return fetch('http://localhost:3000/ingredients', createRequestionOptions('POST', ingredientForDB))
        })

        Promise.all([postProductsPromise, ...ingredientsPromises])
            .then(resp => {
                Promise.all(resp.map(res => res.json())).then(responses => {
                    // First index is the product res
                    // 2 - end are ingredients (respectively)
                    let productRes = responses[0];
                    let productToIngredientPromises = responses.slice(1).map(ingredientRes => {
                        let prodIngred = {
                            product_id: parseInt(productRes.id),
                            ingredient_id: parseInt(ingredientRes.id)
                        }
                        fetch('http://localhost:3000/product_ingredients', createRequestionOptions('POST', prodIngred))
                    })
                    Promise.all(productToIngredientPromises)
                        .then(() => {
                            // Now we can fetch the final, inserted product
                            let id = parseInt(productRes.id);
                            console.log(id)
                            fetch(`http://localhost:3000/products/${id}`)
                                .then(res => res.json())
                                .then(finalProductRes => {
                                    onAddProduct(finalProductRes);
                                    history.push("/available-products")
                                })
                        })
                })

            })

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Add New Product</h3>
                <label htmlFor="name">Name</label>
                <input type="text"
                    name="name"
                    placeholder="Product name"
                    value={name}
                    onChange={e => setName(e.target.value)} />
                <br />
                <br />
                <label htmlFor="category">Category</label>
                <input type="text"
                    name="category"
                    placeholder="Product category"
                    value={category}
                    onChange={e => setCategory(e.target.value)} />
                <br />
                <br />
                <label htmlFor="brand">Brand</label>
                <input type="text"
                    name="brand"
                    placeholder="Product brand"
                    value={brand}
                    onChange={e => setBrand(e.target.value)} />
                <br />
                <br />
                <label htmlFor="ingredient">Product Key Ingredient 1</label>
                <input type="text"
                    name="ingredient1"
                    placeholder="Key ingredient"
                    value={ingredient1}
                    onChange={e => setIngredient1(e.target.value)} />
                <label htmlFor="description1">Description</label>
                <textarea type=""
                    name="description1"
                    value={description1}
                    onChange={e => setDescription1(e.target.value)} />
                <br />
                <br />
                <label htmlFor="ingredient">Product Key Ingredient 2</label>
                <input type="text"
                    name="ingredient2"
                    placeholder="Key ingredient"
                    value={ingredient2}
                    onChange={e => setIngredient2(e.target.value)} />
                <label htmlFor="description2">Description</label>
                <textarea type="text"
                    name="description2"
                    value={description2}
                    onChange={e => setDescription2(e.target.value)} />
                <br />
                <br />
                <label htmlFor="ingredient">Product Key Ingredient 3</label>
                <input type="text"
                    name="ingredient3"
                    placeholder="Key ingredient"
                    value={ingredient3}
                    onChange={e => setIngredient3(e.target.value)} />
                <label htmlFor="description3">Description</label>
                <textarea type="text"
                    name="description3"
                    value={description3}
                    onChange={e => setDescription3(e.target.value)} />
                <br />
                <br />
                <label htmlFor="ingredient4">Product Key Ingredient 4</label>
                <input type="text"
                    name="ingredient"
                    placeholder="Key ingredient"
                    value={ingredient4}
                    onChange={e => setIngredient4(e.target.value)} />
                <label htmlFor="description4">Description</label>
                <textarea type="text"
                    name="description4"
                    value={description4}
                    onChange={e => setDescription4(e.target.value)} />
                <br />
                <br />
                <label htmlFor="image">Image Link</label>
                <input type="text"
                    name="image"
                    placeholder="Product image"
                    value={image}
                    onChange={e => setImage(e.target.value)} />
                <br />
                <br />
                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    placeholder="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)} />
                <br />
                <br />
                <label htmlFor="link">Product Link</label>
                <input type="text"
                    name="link"
                    placeholder="Product link"
                    value={link}
                    onChange={e => setLink(e.target.value)} />
                <br />
                <br />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
}

export default NewProductForm;
