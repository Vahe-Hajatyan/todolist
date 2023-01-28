import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useAppDispatch } from "./hook";
import { getList } from "./redux/slices/list";

function App() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getList());
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
