import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ThumbsUp, ThumbsDown } from "lucide-react"

export function ContentIdeas() {
  const ideas = [
    {
      id: 1,
      title: "10 AI Tools Every Tech Professional Should Know in 2023",
      platform: "linkedin",
      type: "list",
    },
    {
      id: 2,
      title: "How the Latest AI Advancements Are Changing Software Development",
      platform: "linkedin",
      type: "thought leadership",
    },
    {
      id: 3,
      title: "Thread: Breaking down the most important AI announcements this week and what they mean for developers",
      platform: "twitter",
      type: "thread",
    },
    {
      id: 4,
      title: "5 Ways to Implement AI in Your Development Workflow (with code examples)",
      platform: "linkedin",
      type: "tutorial",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">Based on your Professional Tech Writer persona</p>
        </div>
        <Button size="sm" variant="outline" className="gap-1.5">
          <Sparkles className="h-3.5 w-3.5" />
          Generate More
        </Button>
      </div>

      <div className="space-y-3">
        {ideas.map((idea) => (
          <div key={idea.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{idea.title}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="secondary">{idea.platform}</Badge>
                  <Badge variant="outline">{idea.type}</Badge>
                </div>
              </div>
              <div className="flex space-x-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <Button size="sm">Use This Idea</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
