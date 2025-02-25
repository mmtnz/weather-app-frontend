import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/utils/Header";

const Router = () => {
  return (
    <BrowserRouter>
    {/* <BrowserRouter basename="/weather-app-frontend/"> // Uncomment this line if you are deploying to GitHub Pages */}
        <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
    </BrowserRouter>
  );
};
export default Router;