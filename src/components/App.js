import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Quiz from "./Quiz";
import Login from "./Login";
import RecommendedProduct from "./RecommendedProduct";


function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [productsState, setProductsState] = useState([]);

    // autologin
    useEffect(() => {
        //   // TODO: check if there'a token for the logged in user
        fetch("http://localhost:3000/users/1")
            .then((r) => r.json())
            .then((user) => {
                setCurrentUser(user);
            });
    }, []);
console.log(productsState);
    return (
        <>
            <NavBar currentUser={currentUser} />
            <main>
                <Switch>
                    <Route path="/home">
                        <Home key="home" />
                    </Route>
                    <Route path="/quiz">
                        { currentUser ? <Quiz key={currentUser.id} currentUser={currentUser} setCurrentUser={setCurrentUser} setProductsState={setProductsState} /> : null }
                    </Route>
                    <Route path="/login">
                        <Login currentUser={currentUser} setCurrentUser={setCurrentUser} key="login" />
                    </Route>
                    <Route path="/recommendation">
                        {productsState.length > 0 && currentUser.oily_skin !== undefined ? productsState.map(p => <RecommendedProduct productObj={p} key={p.id} />) : null}
                    </Route>
                </Switch>
            </main>
        </>

    )

}

export default App;
