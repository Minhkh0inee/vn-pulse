import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";

export async function GET() {
  try {
    const cached = await redis.get("index:all");
    if (cached) {
      return NextResponse.json(
        {
          success: true,
          data: cached,
          meta: { total: Array.isArray(cached) ? cached.length : 0 },
          source: "cache",
        },
        {
          status: 200,
          headers: {
            "Cache-Control":
              "public, s-maxage=3600, stale-while-revalidate=300",
          },
        },
      );
    }

    const indexes = await prisma.monthlyIndex.findMany({
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

    await redis.set("index:all", indexes, { ex: 3600 });

    return NextResponse.json(
      {
        success: true,
        data: indexes,
        meta: {
          total: indexes.length,
        },
        source: "db",
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=300",
        },
      },
    );
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message.includes("connect") ||
        error.message.includes("ECONNREFUSED") ||
        error.message.includes("timeout"))
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Database is currently unavailable",
          code: "DB_UNAVAILABLE",
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        code: "INTERNAL_ERROR",
      },
      { status: 500 },
    );
  }
}
