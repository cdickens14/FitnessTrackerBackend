import React, { useState, useEffect } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const registerUser = async (token) => {
    const response = await axios.post("/api/users/register", {
      username,
      password,
    });
    setUsername(response.data);
    setPassword(response.data);
    console.log(response.data);
    window.localStorage.setItem(token, `${token}`);

    setUsername("");
    setPassword("");
  };

  const onChange = (event) => {
    if (event.target.name === "username") {
      setUsername(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };
  return (
    <React.Fragment>
      <form id="registerForm" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          onChange={onChange}
          value={username}
          placeholder="Create Username"
        ></input>
        <input
          type="text"
          name="password"
          onChange={onChange}
          value={password}
          placeholder="Create Password"
        ></input>
        <button type="submit" onClick={() => registerUser()}>
          Register Here
        </button>
      </form>
    </React.Fragment>
  );
};

export default Register;
