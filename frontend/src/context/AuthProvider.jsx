import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  
  // 1. Correctly parse JSON object from localStorage
  const [userdata, setUserdata] = useState(() => {
    try {
      const savedUser = localStorage.getItem("userprofile");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Failed to parse user profile from localStorage:", error);
      return null;
    }
  });

  const isAuthenticated = Boolean(token);

  // 2. Custom setter that keeps React State and LocalStorage in sync
  const setProfile = (updatedProfile) => {
    setUserdata((prev) => {
      const nextProfile = typeof updatedProfile === "function" 
        ? updatedProfile(prev) 
        : updatedProfile;

      if (nextProfile) {
        localStorage.setItem("userprofile", JSON.stringify(nextProfile));
      } else {
        localStorage.removeItem("userprofile");
      }
      return nextProfile;
    });
  };

  function LoginUser(token, userprofile) {
    setToken(token);
    setProfile(userprofile); // Also updates localStorage via setProfile above
    localStorage.setItem("token", token);
  }

  function Logout() {
    setToken(null);
    setUserdata(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userprofile");
  }

  return (
    <AuthContext.Provider 
      value={{ token, LoginUser, Logout, isAuthenticated, userdata, setProfile ,setUserdata}}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;