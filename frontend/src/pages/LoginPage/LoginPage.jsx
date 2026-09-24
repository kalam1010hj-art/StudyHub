import React from "react";
import { useNavigate } from "react-router-dom";
import Login from "../../components/Login/Login";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

export default function LoginPage() {
  const navigate = useNavigate();
  

  const handleSuccess = () => {
    // Navigate to authenticated workspace after success unlock animation completes
    
    navigate("/");
  };

  return <Login onSuccess={handleSuccess}  LoginUser={LoginUser}/>;
}