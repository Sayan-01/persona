'use client'
import { createContext, useContext, useState } from "react";

export const HistoryContext = createContext<any>(null);

export const HistoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [history, setHistory] = useState([]);
  return <HistoryContext.Provider value={{ history, setHistory }}>{children}</HistoryContext.Provider>;
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) throw new Error("useHistory must be used inside HistoryProvider");
  return context;
};
