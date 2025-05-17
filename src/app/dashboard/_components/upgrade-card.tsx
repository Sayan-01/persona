import React from "react";

const UpgradeCard = () => {
  return (
    <div className="border rounded-xl mb-4">
      <div className="p-3 pb-0 h-24 bg-gradient-to-br from-[#D6E1FF] via-[#FFD3E9] to-[#FFEED7] rounded-t-xl text-sm ">
        <div className="bg-[#F1F2F6] p-3 h-full rounded-t-[10px]">
          <div className="text-xs font-semibold flex justify-between">
            <p>Basic Plane</p>
            <span className="bg-[#D1D6F2] px-3 py-0.5 text-[#4964f9] rounded-full">4/10</span>
          </div>
          <div className="h-1.5 bg-[#D1D6F2] rounded-full mt-2" />
          <div className="h-1.5 bg-[#bfc8fb] rounded-full w-[80%] mt-2" />
          <div className="h-1.5 bg-[#c3cbfc] rounded-full w-[90%] mt-2" />
        </div>
      </div>
      <div className="p-3">
        <p className="text-xs font-semibold mb-2">🚀 Upgrade to Smart AI</p>
        <p className="text-xs opacity-60">Unlock all the features include AI and more</p>
      </div>
    </div>
  );
};

export default UpgradeCard;
