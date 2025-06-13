import React from "react";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

const layout = async ({ children }:{children:React.ReactNode}) => {
  const session = await auth();
  if (session) redirect("/");
  return (
    <div className="h-screen relative flex items-center justify-center">
      <div className="absolute w-[500px] h-full top-0 opacity-70 bg-gradient-to-br from-[#fc5eea] via-[#ffffff] to-[#7a8cfa] rounded-[100%] blur-[100px]" />
      {children}
    </div>
  );
};

export default layout;
