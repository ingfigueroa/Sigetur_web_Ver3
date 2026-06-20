// src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [clientId, setClientId] = useState(null);
  const [userId, setUserId] = useState(null);

  // 🔹 cargar desde localStorage al iniciar
  useEffect(() => {
    const storedClientId = localStorage.getItem("clientId");
    const storedUserId = localStorage.getItem("userId");

    if (storedClientId) setClientId(storedClientId);
    if (storedUserId) setUserId(storedUserId);
  }, []);

  // 🔹 guardar clientId
  useEffect(() => {

    if (clientId) {
      localStorage.setItem("clientId", clientId);
    } else {
      localStorage.removeItem("clientId");
    }
    console.log(clientId)
  }, [clientId]);

  // 🔹 guardar userId
  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId);
    } else {
      localStorage.removeItem("userId");
    }
  }, [userId]);

  return (
    <AuthContext.Provider
      value={{
        clientId,
        setClientId,
        userId,
        setUserId
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};