"use client";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, CircleUser, ImagePlus as Imagee, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const Page1 = () => {
  const [userInput, setUserInput] = useState("");
  const [referanceImage, setReferanceImage] = useState<any>();
  const [referanceImagePreview, setReferanceImagePreview] = useState<string>();
  const [faceImage, setFaceImage] = useState<any>();
  const [faceImagePreview, setFaceImagePreview] = useState<string>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    console.log("Hi client!", userInput);
    
    try {
      const formData = new FormData();
      formData.append("userInput", userInput);
      formData.append("referanceImage", referanceImage);
      formData.append("faceImage", faceImage);
      const response = await fetch("/api/youtube-content-api/generate-thumbnail", {
        method: "POST",
        body: formData,
        
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="w-full h-full flex items-center justify-center ">
      <div className="px-10 md:px-20 lg:px-40 max-w-6xl">
        <div className=" flex flex-col items-center justify-center gap-2">
          <h1 className="text-4xl font-bold">AI Thumbnail Generator</h1>
          <p className="text-gray-400 text-center">
            Generate AI-powered thumbnails for your YouTube videos, turn your videos into viral hits with in one click - This tool is perfect for creators who want to create engaging thumbnails for
            their videos.
          </p>
        </div>
        <div className="border flex flex-col gap-4 p-3 rounded-2xl mt-10 bg-zinc-800/70">
          {referanceImagePreview || faceImagePreview ? (
            <div className="flex gap-2 items-center w-full ">
              {referanceImagePreview ? (
                <div className="relative">
                  <Image
                    src={referanceImagePreview as string}
                    className="object-cover w-18 h-18 rounded-lg"
                    alt="referanceImage"
                    width={100}
                    height={100}
                  />
                  <div onClick={() => setReferanceImagePreview(undefined)} className="bg-white w-4 h-4 flex items-center justify-center rounded-full pt-0.5 absolute -top-1 -right-1">
                    <X
                      size={12}
                      color="black"
                    />
                  </div>
                </div>
              ) : (
                <></>
              )}
              {faceImagePreview ? (
                <div className="relative">
                  <Image
                    src={faceImagePreview as string}
                    className="object-cover w-18 h-18 rounded-lg"
                    alt="faceImage"
                    width={100}
                    height={100}
                  />
                  <div onClick={() => setFaceImagePreview(undefined)} className="bg-white w-4 h-4 flex items-center justify-center rounded-full pt-0.5 absolute -top-1 -right-1">
                    <X
                      size={12}
                      color="black"
                    />
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
          <div className="flex gap-2 items-center w-full">
            <textarea
            onChange={(e) => setUserInput(e.target.value)}
              className="outline-0 w-full h-16 resize-none"
              placeholder="Enter your video title or description"
            />
          </div>
          <div className=" flex gap-3 ">
            <label
              htmlFor="referanceImage"
              className="rounded-full px-4 h-10 bg-zinc-800/70 border flex items-center justify-center gap-1.5 text-white/80"
            >
              <Imagee size={16} />
              Referace Image
            </label>
            <input
              type="file"
              id="referanceImage"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setReferanceImage(file);
                  setReferanceImagePreview(URL.createObjectURL(file));
                }
              }}
            />
            <label
              htmlFor="faceImage"
              className="rounded-full px-4 h-10 bg-zinc-800/70 border flex items-center justify-center gap-1.5 text-white/80"
            >
              <CircleUser size={16} />
              Face Image
            </label>
            <input
              type="file"
              id="faceImage"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFaceImage(file);
                  setFaceImagePreview(URL.createObjectURL(file));
                }
              }}
            />
            <button
              className="h-10 w-10 flex items-center justify-center ml-auto bg-gradient-to-br from-zinc-50 to-zinc-200 rounded-full"
              type="submit"
              onClick={onSubmit}
            >
              <ArrowUp color="black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page1;
