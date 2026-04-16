import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

const isDemo = process.env.NEXT_PUBLIC_DEMO === "true";
const API_URL = isDemo
  ? "/api"
  : process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.get(`${API_URL}/auth/me`);
      setUser(res.data.data);
    } catch (error) {
      if (isDemo) {
        const demoUser = localStorage.getItem("demoUser");
        if (demoUser) setUser(JSON.parse(demoUser));
      } else {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    if (isDemo) {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      const { token, user } = res.data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("demoUser", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(user);
      return user;
    }

    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    const { token, user } = res.data.data;
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(user);
    return user;
  };

  const register = async (userData) => {
    if (isDemo) {
      const mockUser = {
        id: "demo-" + Date.now(),
        ...userData,
        role: "customer",
      };
      localStorage.setItem("token", "demo-token-" + Date.now());
      localStorage.setItem("demoUser", JSON.stringify(mockUser));
      setUser(mockUser);
      return mockUser;
    }

    const res = await axios.post(`${API_URL}/auth/register`, userData);
    const { token, user } = res.data.data;
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("demoUser");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
