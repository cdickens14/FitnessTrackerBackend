import React, { useState } from "react";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const signIn = async (token) => {
    try {
      const response = await fetch(
        "http://fitnesstrac-kr.herokuapp.com/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              username: `${username}`,
              password: `${password}`,
            },
          }),
        }
      );
      const result = await response.json();
      console.log(result);
      props.setIsLoggedIn === true;
      window.localStorage.setItem("token", `${token}`);
      return result;
    } catch (err) {
      console.error(err);
    }
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
      <form id="loginForm" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          onChange={onChange}
          value={username}
          placeholder="Username"
        ></input>
        <input
          type="text"
          name="password"
          onChange={onChange}
          value={password}
          placeholder="Password"
        ></input>
        <button class="button" type="submit" onClick={() => signIn()}>
          Login
        </button>
      </form>
      {props.isLoggedIn === true ? <Home /> : null}
    </React.Fragment>
  );
};

export default Login;
