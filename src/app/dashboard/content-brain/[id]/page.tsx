import { getPostById } from "../../../../../server/post";
import ContentStatus from "../_components/content-status";
import CopyBtn from "./copy-btn";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Calendar, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const idea = await getPostById(id);
  if (!idea) return null;

  // Format creation date
  const formattedDate = idea.createdAt ? format(new Date(idea.createdAt), "MMMM d, yyyy") : "N/A";
  const readTime = Math.ceil((idea.body?.split(/\s+/).length || 0) / 200); // ~200 words per minute

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="border-2 border-dashed border-indigo-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/20  overflow-hidden transition-all duration-200 hover:shadow-lg dark:shadow-zinc-800/50">
        <CardHeader className="pb-3 border-b-2 border-dashed">
          <div className="flex flex-col space-y-1.5">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-zinc-100 to-purple-500 bg-clip-text text-transparent">{idea.title}</CardTitle>
              
            </div>
            <CardDescription className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 pt-2">
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {formattedDate}
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {readTime} min read
              </span>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="py-2">
          <div
            className="prose dark:prose-invert prose-indigo max-w-none prose-p:leading-relaxed prose-headings:font-semibold 
                     prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-500 
                     dark:hover:prose-a:text-indigo-300 prose-ul:list-disc prose-ol:list-decimal"
            dangerouslySetInnerHTML={{ __html: idea.body }}
          />
        </CardContent>
        <CardFooter className="border-t-2 border-dashed ">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="border-indigo-200 mt-5 dark:border-zinc-700 hover:bg-indigo-50 dark:hover:bg-zinc-800"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open in Editor
            </Button>
            <CopyBtn idea={idea} />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
