import { useState, useEffect } from "react";
import Login from "../components/Login";
import AlertPopup from "../components/AlertPopup"; // Varsayalım ki böyle bir bileşen var

const AdminPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleLogin = (email, password) => {
    // Burada bir kimlik doğrulama işlemi gerçekleştirilebilir
    if (email === "admin@example.com" && password === "password123") {
      setIsUserLoggedIn(true);
    } else {
      setPopupMessage("Invalid credentials");
      setShowPopup(true);
    }
  };

  useEffect(() => {
    let timer;
    if (showPopup) {
      timer = setTimeout(() => {
        setShowPopup(false);
        setPopupMessage("");
      }, 3000); // Popup'un 3 saniye sonra kapanmasını sağlar
    }
    return () => clearTimeout(timer); // Cleanup fonksiyonu
  }, [showPopup]);

  return (
    <div className="flex flex-col w-[100vw] h-[70vh] justify-center items-center">
      {!isUserLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <h1>Admin Panel</h1>
      )}
      {showPopup && (
        <AlertPopup show={showPopup} message={popupMessage} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default AdminPage;
