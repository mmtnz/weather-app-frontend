import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/utils/Header";

const Router = () => {
  return (
    <BrowserRouter>
        <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                {/* <Route path="/about" element={<About />} /> */}
            </Routes>
    </BrowserRouter>
  );
};
export default Router;