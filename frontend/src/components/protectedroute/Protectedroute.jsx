// components/protectedroute/Protectedroute.jsx
import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

export default function Protectedroute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("https://fullbackend-liard.vercel.app/auth/check", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.status, response.data.isAuthenticated);
        if (response.status === 200 && response.data.isAuthenticated) {
          console.log("authentication good");
          setIsAuthenticated(true);
        } else {
          console.log("authentication fails");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated === true) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
}
