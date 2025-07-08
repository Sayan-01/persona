import { getPostById } from "../../../../../server/post";
import ContentStatus from "../_components/content-status";
import CopyBtn from "./copy-btn";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const idea = await getPostById(id);
  if (!idea) return null;

  return (
    <div className="flex items-center justify-center p-5  h-full">
      <div className="w-full h-full border-2 border-blue-400 rounded-2xl border-dashed p-5">
        <h1 className="text-2xl w-[600px] font-bold text-blue-500 mb-2">{idea.title}</h1>
        <p
          className="w-[600px] border-l-2 pl-4 pt-2 border-gray-200 "
          dangerouslySetInnerHTML={{ __html: idea.body }}
        />
        <div>
          
        <CopyBtn idea={idea}/>
        {/* <ContentStatus/> */}
        </div>
      </div>
    </div>
  );
};

export default page;
