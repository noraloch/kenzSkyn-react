import React, { useState } from "react";

function Login({ setCurrentUser }) {
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

        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((r) => r.json())
            .then(userObj => {
                if (userObj.errors) {
                    setErrors(userObj.errors)
                } else {
                    setCurrentUser(userObj)
                }
            })

    }
    return (
        <div>
        <form onSubmit={handleSubmit} autoComplete="off">
          <h3>Login</h3>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.map((error) => {
            return <p key={error}>{error}</p>;
          })}
          <button type="submit" value="Login" >Login</button>
        </form>
      </div>
    );
}

export default Login;