import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";

export async function getCurrentIndex() {
  try {
    const cached = await redis.get("index:latest");
    if (cached) {
      return {
        success: true,
        data: cached,
        source: "cache",
      };
    }

    const currentIndex = await prisma.monthlyIndex.findFirst({
      where: {
        isPublished: true,
      },
      orderBy: {
        month: "desc",
      },
      include: {
        sectorScores: true,
      },
    });

    await redis.set("index:latest", currentIndex, { ex: 3600 });

    return {
      success: true,
      data: currentIndex,
      source: "db",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Failed to fetching current index. Please try again.",
    };
  }
}
