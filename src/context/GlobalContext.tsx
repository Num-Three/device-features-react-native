import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

interface GlobalContextProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [isDarkMode, setIsDarkMode] = useState(useColorScheme() === 'dark');
    const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
    return (
        <GlobalContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};