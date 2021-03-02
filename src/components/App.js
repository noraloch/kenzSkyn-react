import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Quiz from "./Quiz";
import Login from "./Login";
import RecommendationsList from "./RecommendationsList";
import Profile from "./Profile";


function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [productsState, setProductsState] = useState([]);
    const [recommendationsState, setRecommendationsState] = useState([]);

    // autologin
    useEffect(() => {
        //   // TODO: check if there'a token for the logged in user
        fetch("http://localhost:3000/users/1")
            .then((r) => r.json())
            .then((user) => {
                setCurrentUser(user);
            });
    }, []);

    useEffect(()=>{
        fetch("http://localhost:3000/recommendations")
            .then((r) => r.json())
            .then((recommendations) => {
                setRecommendationsState(recommendations);
            });
    }, []);

    return (
        <>
            <NavBar currentUser={currentUser} />
            <main>
                <Switch>
                    <Route path="/home">
                        <Home key="home" />
                    </Route>
                    <Route path="/quiz">
                        { !currentUser ? <h2>Please login so you can take the quiz!</h2> : null}
                        { currentUser ? <Quiz key={currentUser.id} currentUser={currentUser} setCurrentUser={setCurrentUser} setProductsState={setProductsState} /> : null }
                    </Route>
                    <Route path="/login">
                        <Login currentUser={currentUser} setCurrentUser={setCurrentUser} key="login" />
                    </Route>
                    <Route path="/recommendations">
                    {productsState.length < 1 ? <h2>Please take the quiz so you can see your recomendations</h2>
                    : <RecommendationsList recommendationsState={recommendationsState} productsState={productsState} currentUser={currentUser}/> }
                    </Route>
                    <Route path="/profile">
                        { currentUser ? <Profile currentUser={currentUser} /> : null }
                    </Route>
                </Switch>
            </main>
        </>

    )

}

export default App;
