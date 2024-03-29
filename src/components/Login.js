import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Login({ setCurrentUser, setRecommendationsState, setProductsMain  }) {
  const history = useHistory();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState([]);


    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_RAILS_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((r) => r.json())
            .then(data => {
                if (data.errors) {
                  setErrors(data.errors)
                  history.push("/login")
                } else {
                  const {user, token} = data;
                  localStorage.setItem("token", token);
                  setCurrentUser(user);
                  setRecommendationsState(user.recommendations);
                  setProductsMain(user.products);
                  if (user.id === 2 ){
                    history.push("/available-products")
                  }else{
                    history.push("/profile")
                  }
                }
            })

    }
    return (
        <div>
        <form onSubmit={handleSubmit} autoComplete="on">
          <h3>Login</h3><br />
          <label>Username</label><br />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          /><br />
          <label>Password</label><br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          /><br /><br />
          {errors.map((error) => {
            return <p key={error}>{error}</p>;
          })}
          <button type="submit" value="Login" >Login</button>
        </form>
      </div>
    );
}

export default Login;