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
      const response = await api.post("/auth/register", userData);
      const { accessToken, refreshToken, userId, username } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
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

  const updateProfile = async (updatedData, userId) => {
    if (!userId) throw new Error("No authenticated user");
    try {
      const userPersonalData = {
        customerId: userId,
        firstName: updatedData.firstName,
        lastName: updatedData.lastName,
        phoneNumber: updatedData.phoneNumber,
        dateOfBirth: updatedData.dateOfBirth,
      };
      const userLocationData = {
        customerId: userId,
        address: updatedData.address,
        city: updatedData.city,
        state: updatedData.state,
      };
      try {
        const personalResponse = await api.put(
          `/customers/${userId}`,
          userPersonalData
        );
        const locationResponse = await api.put(
          `/customers/${userId}/address`,
          userLocationData
        );
        return {
          personalResponse,
          locationResponse,
        };
      } catch (error) {
        console.error("Failed to update profile:", error);
        throw error;
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      throw error;
    }
    const updatedUser = response.data;
    localStorage.setItem("userId", updatedUser.id);
    localStorage.setItem("userName", updatedUser.username);
    setUserId(updatedUser.id);
    setUserName(updatedUser.username);
    return updatedUser;
  };

  const deleteAccount = async () => {
    if (!userId) throw new Error("No authenticated user");
    await api.delete(`/customers/${userId}`);
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
