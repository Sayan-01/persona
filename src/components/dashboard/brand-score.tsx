import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"

interface BrandScoreProps {
  expanded?: boolean
}

export function BrandScore({ expanded = false }: BrandScoreProps) {
  const metrics = [
    {
      name: "Posting Consistency",
      score: 85,
      description: "You're posting regularly across platforms",
    },
    {
      name: "Content Quality",
      score: 72,
      description: "Your content matches your persona's tone",
    },
    {
      name: "Engagement Rate",
      score: 68,
      description: "Your content is generating moderate engagement",
    },
    {
      name: "Platform Distribution",
      score: 90,
      description: "You're using multiple platforms effectively",
    },
  ]

  return (
    <div className="space-y-4">
      {expanded && (
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Brand Score</h2>
          <p className="text-muted-foreground">Track your content performance and consistency</p>
        </div>
      )}

      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center rounded-full w-24 h-24 border-8 border-primary/20">
            <span className="text-3xl font-bold">78%</span>
          </div>
          <h3 className="mt-2 font-medium">Overall Brand Score</h3>
          <p className="text-sm text-muted-foreground">+12% from last month</p>
        </div>

        <div className="space-y-4">
          {metrics.map((metric) => (
            <div key={metric.name} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">{metric.name}</span>
                <span className="text-sm font-medium">{metric.score}%</span>
              </div>
              <Progress value={metric.score} className="h-2" />
              <p className="text-xs text-muted-foreground">{metric.description}</p>
            </div>
          ))}
        </div>

        {expanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Improvement Tips</h3>
                <ul className="space-y-2">
                  <li className="text-sm">• Post more consistently on Twitter</li>
                  <li className="text-sm">• Use more industry-specific keywords</li>
                  <li className="text-sm">• Increase content length on LinkedIn</li>
                  <li className="text-sm">• Add more engaging questions in your posts</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Strengths</h3>
                <ul className="space-y-2">
                  <li className="text-sm">• Excellent platform distribution</li>
                  <li className="text-sm">• Consistent posting schedule</li>
                  <li className="text-sm">• Good use of hashtags</li>
                  <li className="text-sm">• Professional tone matches your persona</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
