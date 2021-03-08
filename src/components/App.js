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
    const [productsState, setProductsState] = useState([]);
    const [recommendationsState, setRecommendationsState] = useState([]);
    const [productsMain, setProductsMain] = useState([]);
    const [adminProducts, setAdminProducts] = useState([]);

    const history = useHistory();

    function logout() {
        setCurrentUser(null);
        history.push('/login');
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

    useEffect(() => {
        fetch("http://localhost:3000/products")
        .then((r) => r.json())
        .then((productsArr)=>setAdminProducts(productsArr))    
    }, []);

    function handleAddProduct(newProduct) {
        const newProductArray = [newProduct, ...adminProducts];
        setAdminProducts(newProductArray);
      };

    // console.log(recommendationsState);
    // useEffect(()=>{
    //     fetch("http://localhost:3000/recommendations")
    //         .then((r) => r.json())
    //         .then((recommendations) => {
    //             setRecommendationsState(recommendations);
    //         });
    // }, []);

    return (
        <>
            <NavBar currentUser={currentUser} logout={logout} />
            <main>
                <Switch>
                    <Route path="/home">
                        <Home key="home" />
                    </Route>
                    <Route path="/quiz">
                        {/* {!currentUser ? <h2>Please login so you can take the quiz!</h2> : null} */}
                        {currentUser ? currentUser.oily_skin || currentUser.dry_skin || currentUser.combination_skin || currentUser.acne != undefined ? <div><h2>You have already taken the quiz!</h2><Link to="/recommendations">See My Current Recommendations</Link></div> : <Quiz key={currentUser.id} currentUser={currentUser} setCurrentUser={setCurrentUser} setProductsState={setProductsState} />:<h2>Please login so you can take the quiz!</h2>}
                        {/* {currentUser ? <Quiz key={currentUser.id} currentUser={currentUser} setCurrentUser={setCurrentUser} setProductsState={setProductsState} /> : null} */}
                    </Route>
                    <Route path="/login">
                        <Login currentUser={currentUser} setCurrentUser={setCurrentUser} setRecommendationsState={setRecommendationsState} setProductsMain={setProductsMain}  key="login" />
                    </Route>
                    <Route path="/recommendations">
                        {productsState.length < 1 && recommendationsState.length < 1 ? <h2>Please take the quiz so you can see your recomendations</h2>
                            : <RecommendationsList recommendationsState={recommendationsState} productsMain={productsMain} currentUser={currentUser} />}
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
