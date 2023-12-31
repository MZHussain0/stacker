﻿import { db } from "@/lib/db";
import React from "react";

const GetProgress = async (
  userId: string,
  courseId: string
): Promise<number> => {
  try {
    const publishedChapters = await db.chapter.findMany({
      where: {
        isPublished: true,
        courseId,
      },
      select: {
        id: true,
      },
    });

    const publishedChaptersIds = publishedChapters.map((chapter) => chapter.id);

    const validCompletedChapters = await db.userProgress.count({
      where: {
        userId,
        chapterId: {
          in: publishedChaptersIds,
        },
        isCompleted: true,
      },
    });

    const progressPercentage =
      (validCompletedChapters / publishedChaptersIds.length) * 100;

    return Math.round(progressPercentage);
  } catch (error) {
    console.log("[GET_PROGRESS]", error);
    return 0;
  }
};

export default GetProgress;
