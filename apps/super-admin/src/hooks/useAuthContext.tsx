import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import {
    type User,
} from "@/types/user.types";
import { hashPasswordSync } from "@clife/utils/hashPassword";
import { getLocalStorageItem, setLocalStorageItem } from "@clife/utils/localStorage";

// Mock users - TODO - application, replace this with API calls
const mockUser: User = {
    id: "1",
    username: "admin",
    password: hashPasswordSync("admin123"), // hashed password
    email: "admin@example.com",
    name: "Admin User",
    rolesMask: 1,
    permissionsMask: 1,
    featuresMask: 1,
};
const secretKey = import.meta.env.VITE_LOCAL_STORAGE_SECRET_KEY;

export type AuthContextType = {
    user: User;
    isLoggedIn: boolean;
    login: (username: string, password: string) => boolean;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>(null);

    useEffect(() => {
        const storedUsername = getLocalStorageItem("userId", secretKey);
        if (storedUsername) {
            // TODO - fetch user details from an API
            const foundUser = mockUser
            if (foundUser) {
                setUser(foundUser);
            }
        }
    }, []);

    const login = (username: string, password: string) => {
        // TODO - replace this with an API call
        const passwordHash = hashPasswordSync(password);
        const foundUser = mockUser

        if (foundUser) {
            setUser(foundUser);
            setLocalStorageItem("userId", foundUser.id, secretKey);
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem("username");
    };



    const value: AuthContextType = {
        user,
        isLoggedIn: !!user,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};
