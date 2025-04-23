import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Resources from "./resources";
import ResourceDetail from "./resources/resourceDetails";
import Profile from "./profile";
import About from "./about";
import Blog from "./blog";
import Contact from "./contact";
import Home from "./home/Index";
import Login from "./authentication/Login";
import SignUp from "./authentication/SignUp";

const Navigation = () => {
  
  const { token, isLoggedIn } = useSelector((state: any) => state.tokenReducer);
  console.log(isLoggedIn)
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/:id" element={<ResourceDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/profile" /> : <Login />} />
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/profile" /> : <SignUp />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/portfolio" element={<div className="flex items-center justify-center h-screen">Hang tight!We are working on it</div>} />
          <Route path="/blog" Component={Blog} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<Navigate to="/" /> } />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Navigation;
