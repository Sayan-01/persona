"use server";

import { db } from "@/lib/db";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";

export const getProgress = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return { success: false, error: "Unauthorized", data: [] };
  }

  try {
    const progress = await db.taskProgress.findMany({
      where: { userId },
      select: {
        weekId: true,
        pillar: true,
        itemIndex: true,
        completed: true,
      },
    });
    return { success: true, data: progress };
  } catch (error) {
    console.error("Error fetching timetable progress:", error);
    return { success: false, error: "Failed to fetch progress", data: [] };
  }
};

export const toggleProgress = async (
  weekId: string,
  pillar: string,
  itemIndex: number,
  completed: boolean
) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await db.taskProgress.upsert({
      where: {
        userId_weekId_pillar_itemIndex: {
          userId,
          weekId,
          pillar,
          itemIndex,
        },
      },
      create: {
        userId,
        weekId,
        pillar,
        itemIndex,
        completed,
      },
      update: {
        completed,
      },
    });

    revalidatePath("/test/time-table");
    return { success: true };
  } catch (error) {
    console.error("Error toggling progress:", error);
    return { success: false, error: "Failed to update progress" };
  }
};

export const togglePillarProgress = async (
  weekId: string,
  pillar: string,
  itemIndices: number[],
  completed: boolean
) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    // We can use a transaction or perform upsert for each item
    await db.$transaction(
      itemIndices.map((itemIndex) =>
        db.taskProgress.upsert({
          where: {
            userId_weekId_pillar_itemIndex: {
              userId,
              weekId,
              pillar,
              itemIndex,
            },
          },
          create: {
            userId,
            weekId,
            pillar,
            itemIndex,
            completed,
          },
          update: {
            completed,
          },
        })
      )
    );

    revalidatePath("/test/time-table");
    return { success: true };
  } catch (error) {
    console.error("Error toggling pillar progress:", error);
    return { success: false, error: "Failed to update pillar progress" };
  }
};
