import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("microlearnai_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        localStorage.removeItem("microlearnai_user");
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      if (!email.includes("@")) {
        throw new Error("Invalid email address");
      }

      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        name: email.split("@")[0],
      };

      setUser(newUser);
      localStorage.setItem("microlearnai_user", JSON.stringify(newUser));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!email || !password || !name) {
        throw new Error("All fields are required");
      }

      if (!email.includes("@")) {
        throw new Error("Invalid email address");
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        name,
      };

      setUser(newUser);
      localStorage.setItem("microlearnai_user", JSON.stringify(newUser));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Signup failed";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate Google login
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newUser: User = {
        id: `user_${Date.now()}`,
        email: `user_${Date.now()}@gmail.com`,
        name: "Google User",
      };

      setUser(newUser);
      localStorage.setItem("microlearnai_user", JSON.stringify(newUser));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Google login failed";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem("microlearnai_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        signup,
        googleLogin,
        logout,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
