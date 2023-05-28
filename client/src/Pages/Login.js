import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import NavigateBar from "Component/NavigateBar";
import "CSS/Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");

  const userAuthenticate = async () => {
    const response = await Axios.get("http://localhost:5000/verifyToken", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    console.log(response);
    if (response.data.message === "User is authenticated.") {
      return true;
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/login", {
      username: usernameLog,
      password: passwordLog,
    }).then((response) => {
      console.log(response);
      if (!response.data.auth) {
        return alert("Wrong username or password!");
      }
      localStorage.setItem("token", response.data.token);
      const checkToken = userAuthenticate();
      if (!checkToken) {
        return alert("User is not authenticated");
      }
      if (response.data.result[0][`username`] === "admin") {
        navigate("/adminEdit");
      } else {
        navigate("/note");
      }
    });
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <NavigateBar isLoggedIn={true} />

      <form className="form_style" onSubmit={handleLogin}>
        <h1>Please log in:</h1>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUsernameLog(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPasswordLog(e.target.value);
          }}
        />

        <button type="submit" className="button_hover">
          Login
        </button>
        <h3>Dont have a username ? Please register.</h3>
        <button className="button_hover" onClick={handleRegister}>
          Register
        </button>
      </form>
    </>
  );
};

export default Login;
