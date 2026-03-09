import { SUPER_ADMIN } from "constants/names";
import { SELLER } from "constants/names";
import { OPERATOR } from "constants/names";
import { ADMIN } from "constants/names";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setReady(true);
  }, []);

  const login = (params = {}) => {
    if (!params?.data) return;

    const { data } = params;
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
    navigate("/", { replace: true });
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const IS_ADMIN = user?.role === ADMIN;
  const IS_SUPER_ADMIN = user?.role === SUPER_ADMIN;
  const IS_SELLER = user?.role === SELLER;
  const IS_OPERATOR = user?.role === OPERATOR;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        ready,
        IS_ADMIN,
        IS_SUPER_ADMIN,
        IS_SELLER,
        IS_OPERATOR,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
