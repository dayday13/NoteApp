import { Home, KeyboardReturn, LoginOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "responsiveCSS/ComponentsCSS/NavigateBar.css";

function NavigateBar({ isLoggedIn }) {
  const navigate = useNavigate();

  return (
    <header>
      <h3>Notes</h3>
      <Home className="nav_btn" onClick={() => navigate("/")}></Home>
      {isLoggedIn ? (
        <KeyboardReturn
          className="nav_btn"
          onClick={() => navigate(-1)}
        ></KeyboardReturn>
      ) : (
        <LoginOutlined
          className="nav_btn"
          onClick={() => navigate("/login")}
        ></LoginOutlined>
      )}
    </header>
  );
}

export default NavigateBar;
