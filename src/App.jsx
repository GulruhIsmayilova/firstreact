import axios from "axios";
import { useState } from "react";
import Dashboard from "./Dashboard";

function Login() {
  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("idle");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: "/login",
      data: {
        username: value,
        password: password,
      },
    })
      .then((res) => {
        if (res.status === 200) setLogin("success");
      })
      .catch(() => {
        setLogin("error");
      });
  };

  if (login === "success")
    return (
      <div>
        <Dashboard />
      </div>
    );

  return (
    <form onSubmit={e => e.preventDefault}>
      <label htmlFor="username">Username</label>
      <br />
      <input
        name="username"
        type="text"
        value={value}
        onChange={handleChange}
      />
      <br />
      <br />
      <label htmlFor="password">Password</label>
      <br />
      <input
        name="password"
        type="password"
        value={password}
        onChange={handlePassword}
      />
      <br />
      <br />
      <button onClick={handleClick}>login</button>
      <br />
      {login === "error" ? "Wrong username or password" : ""}
    </form>
  );
}

export default Login;
