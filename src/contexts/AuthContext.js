// File: src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const userId = JSON.parse(localStorage.getItem("userId"));
      const username = localStorage.getItem("userName");
      setUserId(userId);
      setUserName(username);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    const { accessToken, userId, username } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", username);
    // Update the state to trigger re-render of components using this context
    setUserId(userId);
    setUserName(username);
    navigate("/");
  };

  const register = async (userData) => {
    try {
      await api.post("/auth/register", userData);
      const { accessToken, refreshToken, userId, username } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      console.log(userId, username);
      console.log(
        localStorage.getItem("userId"),
        localStorage.getItem("userName")
      );
      localStorage.setItem("userId", userId);
      localStorage.setItem("userName", username);
      setUserId(userId);
      setUserName(username);
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUserId(null);
    setUserName(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const updateProfile = async (updatedData) => {
    if (!userId) throw new Error("No authenticated user");
    const response = await api.put(`/users/${userId}`, updatedData);
    const updatedUser = response.data;
    localStorage.setItem("userId", updatedUser.id);
    localStorage.setItem("userName", updatedUser.username);
    setUserId(updatedUser.id);
    setUserName(updatedUser.username);
    return updatedUser;
  };

  const deleteAccount = async () => {
    if (!userId) throw new Error("No authenticated user");
    await api.delete(`/users/${userId}`);
    logout();
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        userName,
        loading,
        login,
        register,
        logout,
        updateProfile,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
