import React from "react";

const DashboardHeading = ({title, description}: {title:string, description:string}) => {
  return (
    <div className="mb-8 flex flex-col gap-2">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
};

export default DashboardHeading;
