import axios from "axios";
import { useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Shopping from "./Shopping";

function App() {
  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(sessionStorage.getItem("is-auth"));


  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleGoBack = () => {
    axios({
      method: "post",
      url: "/logout",
      data: {},
    })
      .then((res) => {
        if (res.status === 200) setLogin(sessionStorage.getItem("is-auth"));
      })
      .catch(() => {
        setLogin("error");
      });
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
        if (res.status === 200) setLogin(sessionStorage.getItem("is-auth"));
      })
      .catch(() => {
        setLogin("error");
      });
  };

 
  if (login === "true")
    return (
      <div>
        <Shopping username={value} />
        <Footer username={value} />
       
        <button className="button" onClick={handleGoBack}>
          Logout
        </button>
      </div>
    );

  return (
    <div className="container">
      <div className="card">
        <div className="login">
          <br />
          <input
            placeholder="Username"
            type="text"
            value={value}
            onChange={handleChange}
            className="input"
          />
          <br />
          <br />
          <label className="input" htmlFor="password"></label>
          <br />
          <input
            placeholder="Password"
            className="input"
            type="password"
            value={password}
            onChange={handlePassword}
          />
          <br />
          <br />
          <button className="button" onClick={handleClick}>
            Login
          </button>

          <br />
          {login === "error" ? "Wrong username or password" : ""}
          <div className="message"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
