"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Plus, CalendarIcon, MoreHorizontal, Edit } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock content data
const contentData = [
  {
    id: 1,
    title: "5 Tips for Remote Teams",
    platform: "twitter",
    date: "2025-05-25",
    time: "10:00",
  },
  {
    id: 2,
    title: "AI in Customer Experience",
    platform: "linkedin",
    date: "2025-05-28",
    time: "14:30",
  },
  {
    id: 3,
    title: "The Future of Work",
    platform: "linkedin",
    date: "2025-05-30",
    time: "09:00",
  },
  {
    id: 4,
    title: "Sustainable Business Strategies",
    platform: "twitter",
    date: "2025-06-02",
    time: "16:00",
  },
]

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [view, setView] = useState("month")

  // Generate days for the current month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()

    // Previous month days to fill the first week
    const prevMonthDays = []
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      prevMonthDays.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false,
      })
    }

    // Current month days
    const currentMonthDays = []
    for (let i = 1; i <= daysInMonth; i++) {
      currentMonthDays.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      })
    }

    // Next month days to fill the last week
    const nextMonthDays = []
    const totalDays = prevMonthDays.length + currentMonthDays.length
    const nextMonthDaysNeeded = 42 - totalDays // 6 rows of 7 days
    for (let i = 1; i <= nextMonthDaysNeeded; i++) {
      nextMonthDays.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      })
    }

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
  }

  const days = getDaysInMonth(currentMonth)
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  // Get content for a specific day
  const getContentForDay = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return contentData.filter((content) => content.date === dateString)
  }

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content Calendar</h1>
          <p className="text-gray-500 dark:text-gray-400">Schedule and manage your content across platforms</p>
        </div>
        <Button className="gap-1.5">
          <Plus className="h-4 w-4" />
          Schedule Content
        </Button>
      </div>

      <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">
            {currentMonth.toLocaleString("default", { month: "long" })} {currentMonth.getFullYear()}
          </h2>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Select value={view} onValueChange={setView}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month View</SelectItem>
              <SelectItem value="week">Week View</SelectItem>
              <SelectItem value="agenda">Agenda View</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-1.5">
            <CalendarIcon className="h-4 w-4" />
            Today
          </Button>
        </div>
      </div>

      <div className="rounded-lg border">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 border-b bg-gray-50 dark:bg-gray-900">
          {weekdays.map((day, index) => (
            <div
              key={day}
              className={`px-2 py-3 text-center text-sm font-medium ${
                index === 0 || index === 6 ? "text-gray-500 dark:text-gray-400" : ""
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 grid-rows-6">
          {days.map((day, index) => (
            <div
              key={index}
              className={`min-h-[100px] border-b border-r p-1 ${
                !day.isCurrentMonth ? "bg-gray-50 text-gray-400 dark:bg-gray-900 dark:text-gray-600" : ""
              } ${day.date.toDateString() === new Date().toDateString() ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
            >
              <div className="flex justify-between p-1">
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                    day.date.toDateString() === new Date().toDateString() ? "bg-blue-600 text-white" : ""
                  }`}
                >
                  {day.date.getDate()}
                </span>
                {day.isCurrentMonth && getContentForDay(day.date).length > 0 && (
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="mt-1 space-y-1">
                {day.isCurrentMonth &&
                  getContentForDay(day.date).map((content) => (
                    <div
                      key={content.id}
                      className={`rounded px-2 py-1 text-xs ${
                        content.platform === "linkedin"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200"
                          : "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="line-clamp-1">
                          {content.time} {content.title}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-5 w-5">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              <span>Reschedule</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-4 text-lg font-semibold">Upcoming Content</h3>
        <div className="space-y-3">
          {contentData
            .sort((a, b) => new Date(`${a.date} ${a.time}`).getTime() - new Date(`${b.date} ${b.time}`).getTime())
            .map((content) => (
              <Card key={content.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-full p-2 ${
                        content.platform === "linkedin"
                          ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                          : "bg-sky-100 text-sky-600 dark:bg-sky-900 dark:text-sky-300"
                      }`}
                    >
                      <CalendarIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">{content.title}</h4>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(`${content.date} ${content.time}`).toLocaleString("default", {
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </p>
                        <Badge variant="outline" className="capitalize">
                          {content.platform}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1.5">
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          <span>Reschedule</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit Content</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )
}
