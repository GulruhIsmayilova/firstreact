import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./App.css";
import Dashboard from "./Dashboard";

function App() {
  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(sessionStorage.getItem("is-auth"));
  const [imgSrc, setImgSrc] = useState("");

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

  // uncontrolled
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImgSrc(e.target.result)
    };
  };

  if (login === "true")
    return (
      <div>
        <Dashboard />
        <input
          type="file"
          name="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
        />
        <img src={imgSrc} width="50"/>
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
