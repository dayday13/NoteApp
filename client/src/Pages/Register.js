import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigateBar from "Component/NavigateBar";
import Axios from "axios";

export default function Register() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/register", {
      username: usernameReg,
      password: passwordReg,
    }).then(() => {
      alert("User added successfully");
      if (usernameReg === "admin") {
        navigate("/adminEdit");
      } else {
        navigate("/note", { state: { is_admin: false, is_logged_in: true } });
      }
    });
  };

  return (
    <>
      <NavigateBar isLoggedIn={true} />
      <form className="form_style" onSubmit={handleRegister}>
        <h1>Register:</h1>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <button type="submit" className="button_hover">
          Register
        </button>
      </form>
    </>
  );
}
