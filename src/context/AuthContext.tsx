import { onAuthStateChanged, User } from "firebase/auth";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { FirebaseAuth } from "../firebase";
type UserDataContextType = {
  user: User | null;
  token: string | null;
  signOut: () => void;
};
export const UserDataContext = createContext<UserDataContextType | null>(null);

export const useUser = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};

type UserDataProviderProps = PropsWithChildren;

export const UserDataProvider = ({ children }: UserDataProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const authStateListener = onAuthStateChanged(FirebaseAuth, async (user) => {
      if (user) {
        const token = await user.getIdToken(true);
        setUser(user);
        setToken(token);
      } else {
        setUser(null);
        setToken(null);
      }
    });
    return authStateListener;
  }, [FirebaseAuth]);

  function signOut() {
    FirebaseAuth.signOut();
  }

  return (
    <UserDataContext.Provider value={{ user, token, signOut }}>
      {children}
    </UserDataContext.Provider>
  );
};
