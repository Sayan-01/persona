import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      action: "Created a new persona",
      target: "Professional Tech Writer",
      time: "2 hours ago",
      type: "persona",
    },
    {
      id: 2,
      action: "Generated content",
      target: "LinkedIn Post: AI Trends",
      time: "1 day ago",
      type: "content",
    },
    {
      id: 3,
      action: "Scheduled content",
      target: "Twitter Thread: Tech Tips",
      time: "2 days ago",
      type: "schedule",
    },
    {
      id: 4,
      action: "Updated persona",
      target: "Professional Tech Writer",
      time: "3 days ago",
      type: "persona",
    },
  ]

  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start">
          <Avatar className="h-9 w-9 mr-4">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-medium">You</span> {activity.action}{" "}
              <span className="font-medium">{activity.target}</span>
            </p>
            <div className="flex items-center pt-1">
              <Badge variant="outline" className="mr-2">
                {activity.type}
              </Badge>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
