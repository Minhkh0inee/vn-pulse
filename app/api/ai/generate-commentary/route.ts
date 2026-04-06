import { commentaryGenerate } from "@/lib/ai";
import { CommentaryInput, CommentaryInputSchema } from "@/types/commentary"
import { z } from "zod";

export async function POST(req: Request) {
  const input: CommentaryInput = await req.json();
  const parsed = CommentaryInputSchema.safeParse(input)
  if (!parsed.success) {
  const { fieldErrors } = z.flattenError(parsed.error)
    return Response.json(
      {
        success: false,
        error:   "Invalid input",
        details: fieldErrors,
      },
      { status: 400 }
    )
  }
  const result = commentaryGenerate(parsed.data)

  return result
}