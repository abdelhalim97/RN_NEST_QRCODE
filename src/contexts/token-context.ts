import { createContext } from "react";
interface AppContextInterface {
    token: string;
    setToken: (token: string) => void;
    role: string;
    setRole: (token: string) => void;
}
export const TokenContext = createContext<AppContextInterface>({} as AppContextInterface)