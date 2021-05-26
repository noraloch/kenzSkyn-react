import React, { useState } from "react";
import { useHistory } from "react-router";


function Signup({ setCurrentUser  }) {
    const history = useHistory();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState([]);


    function handleChange(e) {
        // console.log(e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
// POST to signup
    function handleSubmit(e) {
        e.preventDefault();
        // console.log(formData)
        fetch("http://localhost:3000/signup", {
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
                  history.push("/signup")
                } else {
                  const {user, token} = data;
                  localStorage.setItem("token", token);
                  setCurrentUser(user);
                  history.push("/home");
                }
            })
    }
    return (
        <div>
        <form onSubmit={handleSubmit} autoComplete="off">
          <h3>Signup</h3><br />
          <label>First Name</label><br />
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          /><br />
          <label>Last Name</label><br />
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
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