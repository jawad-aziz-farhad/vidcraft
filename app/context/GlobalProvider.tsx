import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";
import { getCurrentUser } from "../lib/appwrite";
import { Models } from "react-native-appwrite";

interface GlobalContextProps {
  isLoading?: boolean;
  isLoggedIn?: boolean;
  user?: Models.Document | undefined;
  setIsLoading?: (isLoading: boolean) => void;
  setIsLoggedIn?: (isLoggedIn: boolean) => void;
  setUser?: (user: Models.Document | undefined) => void;
}

const GlobalContext = createContext<GlobalContextProps>({
  isLoading: false,
  isLoggedIn: false,
  user: {} as Models.Document,
  setIsLoading: (isLoading: boolean) => {},
  setIsLoggedIn: (isLoggedIn: boolean) => {},
  setUser: (user: Models.Document | undefined) => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [user, setUser] = useState<Models.Document | undefined>(
    {} as Models.Document
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCurrentUser()
      .then((user) => {
        setIsLoggedIn(true);
        setUser(user);
      })
      .catch((error) => {
        console.log("ERROR", error);
        setUser(undefined);
        setIsLoggedIn(false);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <GlobalContext.Provider
      value={{ isLoading, isLoggedIn, user, setIsLoggedIn, setUser }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
