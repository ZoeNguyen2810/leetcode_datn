// GlobalContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GlobalContextProps {
    selectedDate: string | null;
    setSelectedDate: (date: string | null) => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalProviderProps {
    children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    return (
        <GlobalContext.Provider value={{ selectedDate, setSelectedDate }}>
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
