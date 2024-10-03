import { ReactNode } from "react";

export interface IHomeProviderProps {
    children: ReactNode;
}
export interface IHomeContextType {
    handleNavigate:(path: string, role:Array<string>) => void;
}