import React, { useState } from "react";
import { useHistory } from "react-router";


function Signup({ setCurrentUser, setRecommendationsState, setProductsMain  }) {
    const history = useHistory();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState([]);


    function handleChange(e) {
        console.log(e.target.name);
        console.log(e.target.value);

        console.log(e.target.input);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();

        fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((r) => r.json())
            .then(user => {
                if (user.errors) {
                    setErrors(user.errors)
                    history.push("/signup")
                } else {
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
        <div style={{marginLeft: "20%"}}>
        <form onSubmit={handleSubmit} autoComplete="off">
          <h3>Signup</h3><br />
          <label>First Name</label><br />
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          /><br />
          <label>Last Name</label><br />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          /><br />
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
          <button type="submit" value="Signup" >Signup</button>
        </form>
      </div>
    );
}

export default Signup;