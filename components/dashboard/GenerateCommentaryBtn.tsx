"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { ICommentaryInput } from "@/types/commentary"

interface Props {
  input: ICommentaryInput
  onGenerated: (text: string) => void
}

const GenerateCommentaryBtn = ({ input, onGenerated }: Props) => {
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)

    try {
      const res = await fetch("/api/ai/generate-commentary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? `HTTP ${res.status}`)
      }

      const reader = res.body?.getReader()
      if (!reader) throw new Error("No response body")

      const decoder = new TextDecoder()
      let text = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        text += decoder.decode(value, { stream: true })
        onGenerated(text)
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Không thể tạo commentary")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleGenerate} disabled={loading}>
      {loading ? "Đang tạo..." : "Generate with AI"}
    </Button>
  )
}

export default GenerateCommentaryBtn
