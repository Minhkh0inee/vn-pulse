"use client"

import { useState } from "react"
import GenerateCommentaryBtn from "./GenerateCommentaryBtn"
import { ICommentaryInput } from "@/types/commentary"

export function CommentarySection({ input }: { input: ICommentaryInput }) {
  const [commentary, setCommentary] = useState("")

  return (
    <div className="flex flex-col gap-3">
      <GenerateCommentaryBtn input={input} onGenerated={setCommentary} />
      {commentary && (
        <textarea
          className="w-full text-sm leading-relaxed resize-y rounded-md border border-input bg-background p-3 min-h-32"
          value={commentary}
          onChange={(e) => setCommentary(e.target.value)}
        />
      )}
    </div>
  )
}
