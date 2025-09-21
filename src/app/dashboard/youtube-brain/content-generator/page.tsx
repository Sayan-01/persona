"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { ArrowUp, CircleUser, ImagePlus as Imagee, X } from "lucide-react";
import Image from "next/image";

const page = () => {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const onGenerate = () => {

  }
  return (
    <section className="flex items-center flex-col w-full max-w-3xl mx-auto  mt-8">
      <h1 className="text-3xl font-semibold">
        <span className="text-orange-300">AI Content </span>Generator
      </h1>
      <p className="text-sm opacity-60 mt-1">What would like to create today</p>
      <div className="p-3 w-full rounded-2xl bg-[#ffffff08] mt-6">
        
        <div className="flex gap-2 items-center w-full">
          <textarea
            onChange={(e) => setUserInput(e.target.value)}
            className="outline-0 h-16 resize-none flex text-white/70 w-full rounded-md bg-transparent text-sm placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="🏀 Enter your video title or description"
          />
        </div>
        <div className=" flex gap-3 ">
          <button
            className="h-8 w-8 flex items-center justify-center ml-auto bg-gradient-to-br from-zinc-50 to-zinc-200 rounded-full"
            type="submit"
            onClick={onGenerate}
          >
            <ArrowUp color="black" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default page;
