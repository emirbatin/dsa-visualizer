import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage"; // 'page' değil 'pages' klasöründe olduğundan emin olun
import Navbar from "./components/Navbar";
import AlgorithmPage from "./pages/AlgorithmPage"; // AlgorithmPage'i doğru bir şekilde içe aktarıyoruz
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/algorithm/:algorithmId" element={<AlgorithmPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
