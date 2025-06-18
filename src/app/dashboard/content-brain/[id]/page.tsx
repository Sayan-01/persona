import React from "react";
import { getPostById } from "../../../../../server/post";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const idea = await getPostById(id);
  if (!idea) return null;

  return (
    <div className="flex items-center justify-center p-5  h-full">
      <div className="w-full h-full border-2 border-blue-400 rounded-2xl border-dashed p-5">
        <p
          className="w-[800px]"
          dangerouslySetInnerHTML={{ __html: idea.body }}
        />
      </div>
    </div>
  );
};

export default page;
