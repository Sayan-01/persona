"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CreditContextType {
  credits: number;
  decrementCredits: (amount: number) => Promise<void>;
}

const CreditContext = createContext<CreditContextType | undefined>(undefined);

export const CreditProvider = ({ children }: { children: ReactNode }) => {
  const [credits, setCredits] = useState<number>(0);
  const userId = "USER_ID_HERE"; // replace with auth userId

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const res = await fetch("/api/user/credits", { headers: { "x-user-id": userId } });
        const data = await res.json();
        setCredits(data.credits);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCredits();
  }, []);

  const decrementCredits = async (amount: number) => {
    const prev = credits;
    setCredits(prev - amount); // optimistic update
    try {
      const res = await fetch("/api/user/decrement-credits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, amount }),
      });
      const data = await res.json();
      if (res.ok) setCredits(data.credits);
      else setCredits(prev); // rollback if error
    } catch (err) {
      console.error(err);
      setCredits(prev); // rollback if fetch fails
    }
  };

  return <CreditContext.Provider value={{ credits, decrementCredits }}>{children}</CreditContext.Provider>;
};

export const useCredits = () => {
  const context = useContext(CreditContext);
  if (!context) throw new Error("useCredits must be used inside CreditProvider");
  return context;
};
