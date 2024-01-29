import axios from "axios";
import { AppStates } from "@/hooks/context/appContext";
import { toast } from "@/components/ui/use-toast";

export const verifyToken = async () => {
  const { saveUser, setLoggedIn, setLoading } = AppStates();
  try {
    const storedToken = localStorage.getItem("user");
    if (storedToken) {
      const response = await axios.post(
        "http://localhost:5050/auth/checkToken",
        { token: storedToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === 200) {
        saveUser({
          id: response.data.data.decode.id,
          email: response.data.data.decode.email,
          token: storedToken,
        });
        setLoggedIn(true);
      } else {
        toast({
          title: "Error",
          description: response.data.data.message,
        });
      }
    }
  } catch (err) {
    toast({
      title: "Error",
      description: err.response?.data.message || "An error occurred",
    });
    console.error(err);
  }

  setLoading(false);
};
