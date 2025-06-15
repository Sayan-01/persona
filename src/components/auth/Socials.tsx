import React from "react";
import { Goo_login } from "../../../server/auth";
import { Google } from "@/icons/google";


const Socials = () => {
  return (
    <div className="flex flex-col space-y-4 mb-8">
      <form action={Goo_login}>
        <button
          className=" relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-white rounded-xl border-[1px] border-zinc-300 h-10 font-medium shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="submit"
        >
          <Google />
          <span className="text-neutral-700 text-sm">Log in with Google</span>
          <BottomGradient />
        </button>
      </form>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export default Socials;
