import { useState, useContext, useEffect } from "react";
import Login from "../components/Login";
import AlertPopup from "../components/AlertPopup"; // Assume such a component exists
import { AuthContext } from "../context/AuthContext"; // Adjust the path as needed
import DashboardPage from "./DashboardPage";

const AdminPage = () => {
  const { isUserLoggedIn, login } = useContext(AuthContext);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleLogin = async (event, email, password, rememberMe) => {
    event.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
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
        <DashboardPage/>
      )}
      {showPopup && (
        <AlertPopup show={showPopup} message={popupMessage} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default AdminPage;
