import { SUPER_ADMIN } from "constants/names";
import { SELLER } from "constants/names";
import { OPERATOR } from "constants/names";
import { ADMIN } from "constants/names";
import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import type { ApiAuthUser } from "services/api/authApi";

const AUTH_TOKEN_KEY = "auth_token";
const USER_KEY = "user";

export type AuthUser = ApiAuthUser & {
  permissions?: string[];
};

export interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  login: (params: { token: string; user: AuthUser }) => void;
  logout: () => void;
  ready: boolean;
  IS_ADMIN: boolean;
  IS_SUPER_ADMIN: boolean;
  IS_SELLER: boolean;
  IS_OPERATOR: boolean;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser) as AuthUser);
      } catch {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }
    setReady(true);
  }, []);

  const login = (params: { token: string; user: AuthUser }) => {
    const { token: nextToken, user: nextUser } = params;
    localStorage.setItem(AUTH_TOKEN_KEY, nextToken);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
    navigate("/", { replace: true });
  };

  const logout = () => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setUser(null);
    setToken(null);
    navigate("/sign-in", { replace: true });
  };

  const roleStr =
    user?.role !== undefined && user?.role !== null
      ? String(user.role)
      : undefined;

  const IS_ADMIN = roleStr === ADMIN;
  const IS_SUPER_ADMIN = roleStr === SUPER_ADMIN;
  const IS_SELLER = roleStr === SELLER;
  const IS_OPERATOR = roleStr === OPERATOR;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
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
