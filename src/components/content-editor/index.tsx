"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Wand2 } from "lucide-react"

interface ContentEditorProps {
  initialContent?: string
  onSave: (content: string) => void
  onEnhance?: () => void
}

export function ContentEditor({ initialContent, onSave, onEnhance }: ContentEditorProps) {
  const [content, setContent] = useState("")
  
  useEffect(() => {
    if (initialContent) {
      // Parse and format the content if it's a JSON string
      try {
        const formattedContent = initialContent.replace(/\\n/g, '\n').replace(/^"|"$/g, '');
        setContent(formattedContent);
      } catch (error) {
        setContent(initialContent);
      }
    }
  }, [initialContent]);

  return (
    <Card className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Edit className="h-4 w-4" />
          <span className="font-medium">Content Editor</span>
        </div>
        <div className="flex gap-2">
          {onEnhance && (
            <Button variant="outline" size="sm" onClick={onEnhance} className="gap-1.5">
              <Wand2 className="h-4 w-4" />
              Enhance
            </Button>
          )}
          <Button size="sm" onClick={() => onSave(content)} className="gap-1.5">
            Save Changes
          </Button>
        </div>
      </div>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[500px] font-mono text-sm"
        placeholder="Write or edit your content here..."
        style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5' }}
      />
    </Card>
  )
}
