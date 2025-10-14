import { useState } from "react";
import { callAiApi} from "@/utils/helper";
import { Field } from "./growth-content-component";
import AIinput from "@/components/global/ai-input";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

function buildEdTechPrompt({ topic, level, objectives, format }: { topic: string; level: string; objectives: string; format: "outline" | "summary" | "quiz" }) {
  return `You are an experienced educator. Produce a ${format} for the topic: ${topic}.
Student level: ${level}
Learning objectives: ${objectives}
If outline: produce 5-8 lesson points with short notes. If quiz: create 8 multiple-choice questions with 4 options and mark the correct answer. If summary: provide a concise study note of ~200 words.`;
}

function EdTechBrain({ setEdtechResult }: { setEdtechResult: (result: string | null) => void }) {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("High School");
  const [objectives, setObjectives] = useState("");
  const [format, setFormat] = useState<"outline" | "summary" | "quiz">("outline");
  const [loading, setLoading] = useState(false);

  async function onGenerate() {
    setLoading(true);
    const prompt = buildEdTechPrompt({ topic, level, objectives, format });
    const res = await callAiApi(prompt);
    // If API returns structured data use it. Here we assume `res.text` contains the content.
    setEdtechResult(res.text || JSON.stringify(res, null, 2));
    setLoading(false);
  }

  return (
    <div className="space-y-8">
      <Field
        title="🔥 Topic"
        description="Enter the topic for the EdTech content"
      >
        <AIinput
          value={topic}
          onChange={(e: any) => setTopic(e.target.value)}
          placeholder="Enter topic"
        />
      </Field>

      <div className="grid grid-cols-2 gap-2 mt-3">
        <div>
          <Field
            title="⚖️ Student level"
            description="Enter the student level for the EdTech content"
          >
            <AIinput
              value={level}
              onChange={(e: any) => setLevel(e.target.value)}
              placeholder="e.g. High School"
            />
          </Field>
        </div>

        <div>
          <Field
            title="📝 Format of content"
            description="Select the format for the EdTech content"
          >
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as any)}
              className="bg-white dark:bg-zinc-800 p-3 box font-light w-full rounded-xl overflow-hidden h-12 border-2 border-dashed border-indigo-300 dark:border-zinc-700 hover:border-indigo-400 dark:hover:border-zinc-600 transition-all outline-none"
            >
              <option value="outline">Lesson Outline</option>
              <option value="summary">Summary / Notes</option>
              <option value="quiz">Quiz (MCQs)</option>
            </select>
          </Field>
        </div>
      </div>

      <div className="mt-3">
        <Field
          title="🎯 Learning objectives"
          description="Enter the learning objectives for the EdTech content"
        >
          <textarea
            placeholder="Enter learning objectives for the EdTech content"
            value={objectives}
            onChange={(e) => setObjectives(e.target.value)}
            rows={4}
            className="w-full border-2 border-dashed border-indigo-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg p-4 h-48 text-sm resize-none outline-none hover:border-indigo-400 dark:hover:border-zinc-600 transition-all"
          />
        </Field>
      </div>

      <Button
        onClick={onGenerate}
        disabled={loading}
        className="w-full hover:bg-gradient-to-r gap-2 h-10 rounded-lg border-none bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-zinc-800 dark:to-zinc-900 hover:from-indigo-700 hover:to-purple-700 dark:hover:from-zinc-700/60 dark:hover:to-zinc-800/40 text-white shadow-lg  transition-all hover:duration-200 duration-200 "
      >
        {loading ? (
          <>
            <RefreshCw className="h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>✨ Generate</>
        )}
      </Button>
    </div>
  );
}

export default EdTechBrain;