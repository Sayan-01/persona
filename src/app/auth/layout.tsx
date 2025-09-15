import React from "react";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

const layout = async ({ children }:{children:React.ReactNode}) => {
  const session = await auth();
  if (session) redirect("/");
  return (
    <div className="h-screen relative flex items-center justify-center">
      {children}
    </div>
  );
};

export default layout;
