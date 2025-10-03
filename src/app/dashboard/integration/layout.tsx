import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full p-4 dark:bg-zinc-900">{children}</div>;
};

export default layout;
