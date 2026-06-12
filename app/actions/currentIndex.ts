import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import type { ActionResponse } from "@/app/types/actionResponse";
import type { IMonthlyIndex } from "@/app/types/monthlyIndex";

export async function getCurrentIndex(): Promise<ActionResponse<IMonthlyIndex>> {
  try {
    const cached = await redis.get<IMonthlyIndex>("index:latest");
    if (cached) {
      return { success: true, data: cached };
    }

    const currentIndex = await prisma.monthlyIndex.findFirst({
      where: { isPublished: true },
      orderBy: { month: "desc" },
      include: { sectorScores: true },
    });

    if (!currentIndex) {
      return { success: false, error: "No published index found." };
    }

    await redis.set("index:latest", currentIndex, { ex: 3600 });

    return { success: true, data: currentIndex as unknown as IMonthlyIndex };
  } catch (error) {
    return { success: false, error: "Failed to fetch current index. Please try again." };
  }
}
