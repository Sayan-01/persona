import React from "react";

const DashboardHeading = ({title, description}: {title:string, description:string}) => {
  return (
    <div className="mt-16 mb-10 flex flex-col gap-3 w-full items-center">
      <h1 className="text-6xl font-[500] bg-gradient-to-r from-[#6403f5] to-[#d86eff] bg-clip-text text-transparent">{title}</h1>
      <p className="text-gray-500 dark:text-gray-400 w-[650px] text-center">{description}</p>
    </div>
  );
};

export default DashboardHeading;
