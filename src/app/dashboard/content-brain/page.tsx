import React from "react";
import ContentBrainPage from "./_components/content-brain-page";
import { auth } from "../../../../auth";

const page = async () => {
  const session = await auth();

  return (
    <div>
      <ContentBrainPage user={session?.user as { id: string; email: string; name: string; isVarified: boolean; isAdmin: boolean }} />
    </div>
  );
};

export default page;
