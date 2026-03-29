import { useEffect } from "react";
import axios from "axios";
import { useUser } from "../../contexts/User.context.jsx";

export default function AuthLoader({ children }) {
  const { setUser } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("UseraccessToken");

        if (!token) return;

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/get-current-user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setUser(res.data.data);
      } catch (error) {
        console.log("Auto login failed");
      }
    };

    fetchUser();
  }, []);

  return children;
}
