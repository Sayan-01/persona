'use client'
import { createContext, useState } from "react";

export const HistoryContext = createContext<any>(null);

export const HistoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [history, setHistory] = useState([]);
  return <HistoryContext.Provider value={{ history, setHistory }}>{children}</HistoryContext.Provider>;
};
