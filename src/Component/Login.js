// import React from "react";
import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth.js";

import axios from "../api/axios.js";
const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth } = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMSg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDafault(); //will reload the page

    try {
      const respone = await axios.post(
        LOGIN_URL,
        JSON.stringify({ Admin: user, pwd }),
        {
          //if wanted a specific username or password than do Username: something
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(respone?.data));
      console.log(JSON.stringify(respone));
      const accessToken = respone?.data?.accessToken;
      const roles = respone?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err?.respone) {
        setErrMsg("No server respone");
      } else if (err.respone?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.respone?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <div>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </div>
      ) : (
        <div>
          <p
            ref={errRef}
            className={errMSg ? "errMsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMSg}
          </p>
          <h1>Please sign in:</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="passowrd">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button>Sign In</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
