import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "Pages/Home";
import Login from "Pages/Login";
import Register from "Pages/Register";
import Edit from "Pages/Edit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/note" element={<Home />} />
        <Route path="/adminEdit" element={<Edit />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
