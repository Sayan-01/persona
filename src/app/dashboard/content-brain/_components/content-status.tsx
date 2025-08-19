import { RadioGroup } from "@/components/ui/radio-group";
import { Clock, Edit, Send } from "lucide-react";
import React from "react";

const ContentStatus = ({ contentStatus, setContentStatus, handleContentAction }: { contentStatus: string; setContentStatus: (e: string) => void; handleContentAction: (e: string) => void }) => {
  return (
    <div className="bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-lg p-3">
      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Content Status</h4>

      <div className="space-y-1.5">
        <div className="grid grid-cols-3 gap-1.5">
          <button
            onClick={() => handleContentAction("draft")}
            className="flex items-center justify-center space-x-1 p-2 rounded-md border border-violet-200 dark:border-violet-900/30 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 hover:bg-violet-100 dark:hover:bg-violet-900/30 transition-colors duration-200"
          >
            <Edit className="w-3.5 h-3.5" />
            <span className="font-medium text-xs">Save Draft</span>
          </button>

          <button
            onClick={() => handleContentAction("scheduled")}
            className="flex items-center justify-center space-x-1 p-2 rounded-md border border-blue-200 dark:border-blue-900/30 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
          >
            <Clock className="w-3.5 h-3.5" />
            <span className="font-medium text-xs">Schedule</span>
          </button>

          <button
            onClick={() => handleContentAction("published")}
            className="flex items-center justify-center space-x-1 p-2 rounded-md border border-green-200 dark:border-green-900/30 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="font-medium text-xs">Publish</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentStatus;
