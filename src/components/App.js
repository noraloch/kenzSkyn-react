import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory, Link } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Quiz from "./Quiz";
import Login from "./Login";
import RecommendationsList from "./RecommendationsList";
import Profile from "./Profile";
import Signup from "./Signup";
import NewProductForm from "./NewProductForm";
import ProductsListAdmin from "./ProductsListAdmin";


function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [recommendationsState, setRecommendationsState] = useState([]);
    const [productsMain, setProductsMain] = useState([]);
    const [adminProducts, setAdminProducts] = useState([]);

    const history = useHistory();

    // autologin
    useEffect(() => {
        // TODO: check if there'a token for the logged in user
        const token = localStorage.getItem("token");
        console.log('token: ', token)
        if (token) {
            fetch(`${process.env.REACT_APP_RAILS_URL}/ba`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then((r) => r.json())
                .then((user) => {
                    console.log('user obj before set', user);
                    setCurrentUser(user);
                    setRecommendationsState(user.recommendations);
                    setProductsMain(user.products);
                })
        }
    }, []);
    // console.log('after set user: ', currentUser);
    // console.log('after set user rec: ', currentUser.recommendations);
    // console.log('after set user prod: ', currentUser.products);


    //admin products
    // useEffect(() => {
    //     if (currentUser && currentUser.id === 2) {
    //         fetch("http://localhost:3000/products")
    //             .then((r) => r.json())
    //             .then((productsArr) => setAdminProducts(productsArr))
    //     }
    // }, []);
    //admin add products
    function handleAddProduct(newProduct) {
        const newProductArray = [...adminProducts, newProduct];
        setAdminProducts(newProductArray);
    };


    function logout() {
        // remove the token
        localStorage.removeItem('token');
        // clear the current user
        setCurrentUser(null);
        history.push('/login');
    };

    function createRequestOptions(methodType, data) {
        return {
            method: methodType,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
    };

    function onReset() {
        setTimeout(set, 500);
        function set() {
            setRecommendationsState([])
        };
        let resetObj = {
            oily_skin: null,
            dry_skin: null,
            combination_skin: null,
            acne: null,
            sport_practice: null
        }
        const token = localStorage.getItem("token");
            fetch(`${process.env.REACT_APP_RAILS_URL}/ba`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(resetObj),
            })
            .then(r => r.json())
            .then(user => {
                setCurrentUser(user)
                currentUser.recommendations.forEach(rec => {
                    fetch(`${process.env.REACT_APP_RAILS_URL}/${rec.id}`, {
                        method: 'DELETE',
                    }).then(() => {
                        setTimeout(st, 200)
                        function st() {
                            setProductsMain([])
                        }
                    })

                })
            })
    }

    function handleShowResult(user) {
        setTimeout(getReady, 3000);
        function getReady() {
            setCurrentUser(user);
        }
        if (currentUser) {
            console.log("in:", user)
            fetch(`${process.env.REACT_APP_RAILS_URL}/products`)
                .then(r => r.json())
                .then((products) => {
                    let userProducts = products.filter(p => {
                    return ((user.acne && p.skin_attribute === 'acne') ||
                        (user.oily_skin && p.skin_attribute === 'oily_skin') ||
                        (user.dry_skin && p.skin_attribute === 'dry_skin') ||
                        (user.combination_skin && p.skin_attribute === 'combination_skin')
                    )
                    }
                    );

                    addRecommended(userProducts);

                });
        };
    }
    function addRecommended(products) {
        // setTimeout(getReady, 2000);
        // function getReady() {
        setProductsMain(products)
        // }
        let recs = [];
        products.forEach(p => {
            let recommendedObj = {
                user_id: currentUser.id,
                product_id: p.id 
            };
            fetch(`${process.env.REACT_APP_RAILS_URL}/recommendations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(recommendedObj),
            }).then(res => res.json()).then(recObj => { recs.push(recObj) })
            // setTimeout(setSt, 500);
            // function setSt() {
            setRecommendationsState(recs)
            // };
            // setTimeout(push, 4000)
            // function push() {
            history.push(`/recommendations`)
            // }
        });
    }
// console.log('PM:', productsMain);
// console.log("RS:", recommendationsState);

    function addSkinAttr(product) {
        let productIngArr = product.ingredients;
        // let allIngArr= [];
        // fetch(`http://localhost:3000/ingredients`)
        // .then(r=>r.json())
        // .then((ings)=>{
        //     allIngArr = ings;
        //     prod
        // })

        let drySkinIng = {
            skinAttr: "dry_skin", ingredients: ["aha", "omega", "lactic acid", "almond oil", "meadowfoam seed oil", "oat", "ceramide", "hyaluronic acid",
                "jojoba oil", "avocado oil", "glycerin", "vitamin E"]
        };
        let combinationSkinIng = { skinAttr: "combination_skin", ingredients: ["copper sulfate", "calendula", "glycolic acid"] };
        let oilySkinIng = { skinAttr: "oily_skin", ingredients: ["retinol", "niacinamide", "clay", "grapeseed oil"] };
        let acneIng = { skinAttr: "acne", ingredients: ["zinc gluconate", "comedoclastin", "zinc sulfate", "salicylic acid"] };

        let allAttributesTable = [drySkinIng, combinationSkinIng, oilySkinIng, acneIng]

        let skinAttrPoints = {};
        productIngArr.forEach((ingredient) => {
            // console.log('Look for ingriedent:', ingredient);
            allAttributesTable.forEach(skinAttrObj => {
                let skinAttrName = skinAttrObj.skinAttr;
                let skinAttrIngredients = skinAttrObj.ingredients;
                // console.log('Checking Skin attribute Object:', skinAttrName);
                if (skinAttrIngredients.includes(ingredient.name.toLowerCase())) {
                    // If this skinAttrName isn't in the points object yet, add it and set to 1
                    if (!skinAttrPoints.hasOwnProperty(skinAttrName)) {
                        skinAttrPoints[skinAttrName] = 1;
                    } else {
                        skinAttrPoints[skinAttrName] += 1;
                    }
                }
            })
        })
        if (Object.entries(skinAttrPoints).length === 0) {
            console.log("no match");
        }

        // Determine which skin attribute best suits these ingredients
        let bestCount = 0;
        let bestSuitedSkinAttr = "";
        for (let [key, value] of Object.entries(skinAttrPoints)) {
            if (value > bestCount) {
                bestCount = value;
                bestSuitedSkinAttr = key;
            }
        }
        let attrToAdd = { skin_attribute: bestSuitedSkinAttr };

        fetch(`${process.env.REACT_APP_RAILS_URL}/${product.id}`, createRequestOptions('PATCH', attrToAdd))
            .then(r => r.json())
            .then(product => { console.log(product) })

        fetch(`${process.env.REACT_APP_RAILS_URL}/products`)
            .then(r => r.json())
            .then((prods) => { setTimeout(wait(prods), 2000) })
        function wait(prods) {
            setAdminProducts(prods)
        }
    }


    // main {
    //   margin-left: 15%;
    //   margin-top: 5%;
    //   margin-bottom: 6%;
    //   display: flex;
    //   max-width: 1280px backgroundColor: "#adc7b6"  maxWidth: "auto";
    // }

    return (
        <>
            <NavBar key="navbar" currentUser={currentUser} logout={logout} />
            <div style={{ margin: "5%", display: "flex", position: "static" }}>
                <Switch>
                    <Route path="/home">
                        <Home key="home" />
                    </Route>
                    <Route path="/quiz">
                        {currentUser ?
                            currentUser.oily_skin !== null || currentUser.dry_skin !== null ||
                                currentUser.combination_skin !== null || currentUser.acne !== null ||
                                recommendationsState.length > 0 ?
                                <div key={currentUser.id}>
                                    <h2>You have already taken the quiz!</h2>
                                    <Link to="/recommendations">See My Current Recommendations</Link><br />
                                    <button onClick={onReset}>Take the quiz again</button>
                                </div> : <Quiz key="quiz" setCurrentUser={setCurrentUser} currentUser={currentUser} handleShowResult={handleShowResult} />
                            : <h1 key="login">Please login to take the quiz!</h1>
                        }
                    </Route>
                    <Route path="/recommendations">
                        {productsMain.length < 1 && recommendationsState.length < 1 ? <h2>Please take the quiz to see your recomendations</h2> : <RecommendationsList recommendationsState={recommendationsState} productsMain={productsMain} currentUser={currentUser} key="recommendations" />}
                    </Route>
                    <Route path="/login">
                        <Login currentUser={currentUser} setCurrentUser={setCurrentUser} setRecommendationsState={setRecommendationsState} setProductsMain={setProductsMain} key="login" />
                    </Route>
                    <Route path="/signup">
                        <Signup currentUser={currentUser} setCurrentUser={setCurrentUser} setRecommendationsState={setRecommendationsState} setProductsMain={setProductsMain} key="signup" />
                    </Route>
                    <Route path="/profile">
                        {currentUser ? <Profile key={currentUser.id} currentUser={currentUser} recommendationsState={recommendationsState} /> : <h1 key="login">Please login to to see this page!</h1>}
                    </Route>
                    <Route path="/new-product">
                        <NewProductForm addSkinAttr={addSkinAttr} key="new" onAddProduct={handleAddProduct} />
                    </Route>
                    <Route path="/available-products">
                        <ProductsListAdmin key="products" adminProducts={adminProducts} setAdminProducts={setAdminProducts} />
                    </Route>
                </Switch>
            </div>
        </>

    )

}

export default App;
