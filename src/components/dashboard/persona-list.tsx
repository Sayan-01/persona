import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash } from "lucide-react"

interface PersonaListProps {
  expanded?: boolean
}

export function PersonaList({ expanded = false }: PersonaListProps) {
  const personas = [
    {
      id: 1,
      name: "Professional Tech Writer",
      tone: "Professional",
      industry: "Technology",
      targetAudience: ["Tech Professionals", "IT Managers"],
      contentGoals: ["Educate", "Inform"],
    },
  ]

  return (
    <div className="space-y-4">
      {expanded && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Personas</h2>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Persona
          </Button>
        </div>
      )}

      {personas.length === 0 ? (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>No personas yet</CardTitle>
            <CardDescription>Create your first persona to start generating content</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Create Persona
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid gap-4 grid-cols-1">
          {personas.map((persona) => (
            <Card key={persona.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{persona.name}</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  Tone: {persona.tone} • Industry: {persona.industry}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium">Target Audience:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {persona.targetAudience.map((audience, i) => (
                        <Badge key={i} variant="secondary">
                          {audience}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Content Goals:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {persona.contentGoals.map((goal, i) => (
                        <Badge key={i} variant="outline">
                          {goal}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Generate Content</Button>
              </CardFooter>
            </Card>
          ))}

          {expanded && (
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle>Create a new persona</CardTitle>
                <CardDescription>Add another persona to diversify your content</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Create Persona
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
