import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useAppDispatch } from "./hook";
import Register from "./pages/Register";
import { getMe } from "./redux/slices/auth";
import Login from "./pages/Login";

function App() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getMe());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
