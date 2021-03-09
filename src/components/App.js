import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory, Link } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Quiz from "./Quiz";
import Login from "./Login";
import RecommendationsList from "./RecommendationsList";
import Profile from "./Profile";
import NewProductForm from "./NewProductForm";
import ProductsListAdmin from "./ProductsListAdmin";



function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [recommendationsState, setRecommendationsState] = useState([]);
    const [productsMain, setProductsMain] = useState([]);
    const [adminProducts, setAdminProducts] = useState([]);

    const history = useHistory();

    function logout() {
        setCurrentUser(null);
        history.push('/login');
    };

    function createRequestionOptions(methodType, data) {
        return {
            method: methodType,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
    };


    // autologin
    useEffect(() => {
        // TODO: check if there'a token for the logged in user
        fetch("http://localhost:3000/users/1")
            .then((r) => r.json())
            .then((user) => {
                setCurrentUser(user);
                setRecommendationsState(user.recommendations)
                setProductsMain(user.products)
            });
    }, []);

    // useEffect(() => {
    //     fetch(`http://localhost:3000/users/${currentUser.id}`)
    //         .then((r) => r.json())
    //         .then((user) => {
    //             setCurrentUser(user)
    //             setRecommendationsState(user.recommendations)
    //             setProductsMain(user.products)})
    // }, []);

    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then((r) => r.json())
            .then((productsArr) => setAdminProducts(productsArr))
    }, []);

    function handleAddProduct(newProduct) {
        const newProductArray = [newProduct, ...adminProducts];
        setAdminProducts(newProductArray);
    };


    // function onSaveRec(recommendation) {
    //     let updatedRecProd = [...recommendationsState, recommendation]
    //     setRecommendationsState(updatedRecProd)
    // }

    function onReset() {
        setRecommendationsState([]);
        let resetObj = {
            oily_skin: null,
            dry_skin: null,
            combination_skin: null,
            acne: null,
            sport_practice: null
        }
        fetch(`http://localhost:3000/users/${currentUser.id}`, createRequestionOptions('PATCH', resetObj))
            .then(r => r.json())
            .then(user => {
                setCurrentUser(user)
                currentUser.recommendations.forEach(rec => {
                    fetch(`http://localhost:3000/recommendations/${rec.id}`, {
                        method: 'DELETE',
                    }).then(() => {
                        setProductsMain([])
                    })

                })
            }
            )
    }

    function handleShowResult(user) {
        setCurrentUser(user);
        if (currentUser) {
            fetch('http://localhost:3000/products')
                .then(r => r.json())
                .then((products) => {
                    let userProducts = products.filter(p =>
                    ((user.acne && p.skin_attribute === 'acne') ||
                        (user.oily_skin && p.skin_attribute === 'oily_skin') ||
                        (user.dry_skin && p.skin_attribute === 'dry_skin') ||
                        (user.combination_skin && p.skin_attribute === 'combination_skin')
                    ));
                    addRecommended(userProducts);
                });
        };
    }
    function addRecommended(products) {
        products.map(p => {
            let recommendedObj = {
                user_id: currentUser.id,
                product_id: p.id
            };
            fetch(`http://localhost:3000/recommendations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(recommendedObj),
            }).then(res => res.json()).then(recObj => addRecToState(recObj))
            setProductsMain(products)
            history.push(`/recommendations`)
        });
    }

    function addRecToState(recObj) {
        let updatedArr = [...recommendationsState, recObj]
        setRecommendationsState(updatedArr)
    }


    return (
        <>
            <NavBar currentUser={currentUser} logout={logout} />
            <main>
                <Switch>
                    <Route path="/home">
                        <Home key="home" />
                    </Route>
                    <Route path="/quiz">
                        {currentUser ?
                            currentUser.oily_skin !== null || currentUser.dry_skin !== null || currentUser.combination_skin !== null || currentUser.acne !== null || recommendationsState.length > 0 ?
                                <div key={currentUser.id}>
                                    <h2>You have already taken the quiz!</h2>
                                    <Link to="/recommendations">See My Current Recommendations</Link><br />
                                    <button onClick={onReset}>Take the quiz again</button>
                                </div> : <Quiz key={currentUser.id} setCurrentUser={setCurrentUser} currentUser={currentUser} handleShowResult={handleShowResult} />
                            : <h2 key="login">Please login to take the quiz!</h2>
                        }
                    </Route>
                    <Route path="/recommendations">
                        {productsMain.length < 1 && recommendationsState.length < 1 ? <h2>Please take the quiz so you can see your recomendations</h2> : <RecommendationsList recommendationsState={recommendationsState} productsMain={productsMain} currentUser={currentUser} />}
                    </Route>
                    <Route path="/login">
                        <Login currentUser={currentUser} setCurrentUser={setCurrentUser} setRecommendationsState={setRecommendationsState} setProductsMain={setProductsMain} key="login" />
                    </Route>
                    <Route path="/profile">
                        {currentUser ? <Profile key={currentUser.id} currentUser={currentUser} recommendationsState={recommendationsState} /> : null}
                    </Route>
                    <Route path="/new-product">
                        <NewProductForm key="new" onAddProduct={handleAddProduct} />
                    </Route>
                    <Route path="/available-products">
                        <ProductsListAdmin key="products" adminProducts={adminProducts} />
                    </Route>
                </Switch>
            </main>
        </>

    )

}

export default App;
