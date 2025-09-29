import React from "react";
import ContentBrainPage from "./_components/content-brain-page";
import { auth } from "../../../../auth";

const page = async () => {
  const session = await auth();
  return (
    <>
      <ContentBrainPage user={session?.user as { id: string; email: string; name: string; isVarified: boolean; isAdmin: boolean }} />;
    </>
  );
};

export default page;
