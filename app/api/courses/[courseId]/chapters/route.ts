﻿import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const lastChapter = await db.chapter.findFirst({
      where: {
        courseId: params.courseId,
      },
      orderBy: {
        posititon: "desc",
      },
    });

    const newPosition = lastChapter ? lastChapter.posititon + 1 : 1;

    const chapter = await db.chapter.create({
      data: {
        title: title,
        courseId: params.courseId,
        posititon: newPosition,
      },
    });
    return NextResponse.json(chapter, { status: 200 });
  } catch (error) {
    console.log("[CHAPTERS:POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
