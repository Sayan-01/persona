"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { useState } from "react"

export function ContentCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [month, setMonth] = useState<Date>(new Date())

  const events = [
    {
      id: 1,
      title: "LinkedIn Post: AI Trends",
      date: new Date(2023, 4, 15),
      status: "scheduled",
      platform: "linkedin",
    },
    {
      id: 2,
      title: "Twitter Thread: Tech Tips",
      date: new Date(2023, 4, 18),
      status: "draft",
      platform: "twitter",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Content Calendar</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Schedule Content
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-[300px_1fr]">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Calendar</CardTitle>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const newMonth = new Date(month)
                    newMonth.setMonth(newMonth.getMonth() - 1)
                    setMonth(newMonth)
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const newMonth = new Date(month)
                    newMonth.setMonth(newMonth.getMonth() + 1)
                    setMonth(newMonth)
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              month={month}
              onMonthChange={setMonth}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scheduled Content</CardTitle>
            <CardDescription>View and manage your upcoming content</CardDescription>
          </CardHeader>
          <CardContent>
            {events.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-center">
                <p className="text-muted-foreground mb-2">No content scheduled</p>
                <Button variant="outline">Schedule Content</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">{event.date.toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={event.status === "scheduled" ? "default" : "outline"}>
                        {event.status === "scheduled" ? "Scheduled" : "Draft"}
                      </Badge>
                      <Badge variant="secondary">{event.platform}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
