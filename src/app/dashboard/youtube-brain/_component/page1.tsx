'use client'
import React, { useState } from "react";

const Page1 = () => {
  const [useInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [referaneImage, setReferaneImage] = useState("");
  const [faceImage, setFaceImage] = useState("");
  return (
    <div className="w-full h-full border flex items-center justify-center flex-col">
      <div className="">
        <h1 className="text-4xl font-bold">AI Thumbnail Generator</h1>
        <p>Generate AI-powered thumbnails for your YouTube videos</p>
      </div>
      <div className="border rounded-lg p-5">
        <form>
          <input
            type="text"
            placeholder="Enter your video title"
          />
          <button type="submit">Generate</button>
        </form>
      </div>
    </div>
  );
};

export default Page1;
