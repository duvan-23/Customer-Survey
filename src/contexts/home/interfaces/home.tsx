import { ReactNode } from "react";

export interface ITodoProviderProps {
    children: ReactNode;
}
export interface IHomeContextType {
    handleNavigate:(path: string, role:Array<string>) => void;
}