import React from "react";
import ButtonLayout from "../buttons/button-layout";
import { ArrowRight } from "lucide-react";

type Props = {
  label: string;
  subLabel: string;
  description: string;
};

const DoubleGradientCard = ({ label, subLabel, description }: Props) => {
  return (
    <div className="relative border border-[#3352cc6d] rounded-xl flex flex-col gap-y-20 overflow-hidden">
      <div>
        <h2 className="text-2xl font-medium">{label}</h2>
        <p className="text-sm opacity-60">{subLabel}</p>
      </div>
      <div className="flex justify-between items-center z-40 gap-x-10">

      <p className="text-sm opacity-60">{description}</p>
      <ButtonLayout>
        <ArrowRight color="white"/>
      </ButtonLayout>
      </div>
    </div>
  );
};

export default DoubleGradientCard;
