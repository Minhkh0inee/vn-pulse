// app/api/test-redis/route.ts

import { deleteKey, getKey, setKey } from "@/utils/redis.utils"


export async function GET() {
  try {
    // Test set
    await setKey("test:hello", "world", 60)

    // Test get
    const value = await getKey("test:hello")

    // Test delete
    await deleteKey("test:hello")

    // Verify delete
    const afterDelete = await getKey("test:hello")

    return Response.json({
      success: true,
      results: {
        setValue: "world",
        getValue: value,        // phải là "world"
        afterDelete: afterDelete // phải là null
      }
    })
  } catch (error) {
    return Response.json({ success: false, error: String(error) }, { status: 500 })
  }
}