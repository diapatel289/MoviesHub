import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AuthContextType {
  token: string | null;
  role: string | null;
  setToken: (token: string | null) => void;
  setRole: (role: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  role: null,
  setToken: () => {},
  setRole: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [role, setRoleState] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedRole = localStorage.getItem('authRole');
    if (storedToken) setTokenState(storedToken);
    if (storedRole) setRoleState(storedRole);
  }, []);

  const setToken = (token: string | null) => {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
    setTokenState(token);
  };

  const setRole = (role: string | null) => {
    if (role) {
      localStorage.setItem('authRole', role);
    } else {
      localStorage.removeItem('authRole');
    }
    setRoleState(role);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, setToken, setRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
