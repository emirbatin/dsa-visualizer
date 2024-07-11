import { useState, useContext, useEffect } from "react";
import Login from "../components/Login";
import AlertPopup from "../components/AlertPopup"; // Assume such a component exists
import { AuthContext } from "../context/AuthContext"; // Adjust the path as needed

const AdminPage = () => {
  const { isUserLoggedIn, login } = useContext(AuthContext);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const baseURL = import.meta.env.VITE_API_URL;

  const handleLogin = async (email, password, rememberMe) => {
    try {
      const response = await fetch(`${baseURL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token, rememberMe);
      } else {
        setPopupMessage(data.error);
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setPopupMessage("An error occurred");
      setShowPopup(true);
    }
  };

  useEffect(() => {
    let timer;
    if (showPopup) {
      timer = setTimeout(() => {
        setShowPopup(false);
        setPopupMessage("");
      }, 3000); // Close the popup after 3 seconds
    }
    return () => clearTimeout(timer); // Cleanup function
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
