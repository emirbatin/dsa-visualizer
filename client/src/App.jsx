import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage"; // Ensure this path is correct
import Navbar from "./components/Navbar";
import AlgorithmPage from "./pages/AlgorithmPage"; // Ensure this path is correct
import AdminPage from "./pages/AdminPage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/algorithm/:algorithmId" element={<AlgorithmPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
