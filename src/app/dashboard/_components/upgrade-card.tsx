import React from "react";

const UpgradeCard = () => {
  return (
    <div className="p-3 bg-[#252525] rounded-2xl text-sm mt-4">
      <h2 className="font-semibold mb-3">
        Upgrade to <span className="bg-gradient-to-r from-[#e903f5] to-[#f98af2] bg-clip-text text-transparent font-bold">Smart AI</span>
      </h2>
      <p className="opacity-60 font-light leading-[1.35] mb-3 text-sm">
        Unlock all the features include
         AI and more
      </p>
      <div className="rounded-full bg-gradient-to-r from-[#e3e587] via-[#9b28ff] to-[#e72ff1] px-4 py-2 font-semibold flex items-center justify-center">Upgrade</div>
    </div>
  );
};

export default UpgradeCard;
