'use client'
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const CopyBtn = ({ idea }: { idea: any }) => {
  return (
    <Button
      className="mt-5"
      onClick={() => {
        const tempElement = document.createElement("div");

        // Step 1: Replace <br> and <br/> tags with newline characters
        const formattedHTML = idea.body.replace(/<br\s*\/?>/gi, "\n");

        // Step 2: Set that as innerHTML of a temporary div
        tempElement.innerHTML = formattedHTML;

        // Step 3: Get the clean text
        const plainText = tempElement.innerText;

        console.log(plainText);

        navigator.clipboard.writeText(plainText);
        toast("Copied To Clipboard");
      }}
    >
      <Copy /> Copy the content
    </Button>
  );
};

export default CopyBtn;
