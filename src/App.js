import React from "react";
import "./Component/css/App.css";
import Header from "./Component/NoteComponents/Header";
import Notes from "./Component/NoteComponents/Notes";
import Login from "./Component/Login";
import Layout from "./Component/Layout";
import RequireAuth from "./Component/RequiredAuth";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*public routes */}
        <Route path="login" element={<Login />} />
      </Route>
      {/* <Header />
      <Notes /> */}
    </Routes>
  );
}

export default App;
