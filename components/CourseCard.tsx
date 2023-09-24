"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IconBadge } from "./IconBadge";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/format";
import CourseProgress from "./CourseProgress";

type Props = {
  id: string;
  title: string;
  chaptersLength: number;
  imageUrl: string;
  price: number;
  progress: number;
  category: string;
};

const CourseCard = ({
  id,
  title,
  chaptersLength,
  imageUrl,
  price,
  progress,
  category,
}: Props) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition duration-200 overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image fill className="object-cover" alt={title} src={imageUrl} />
        </div>

        <div className="flex flex-col pt-2">
          <div className="text-lg font-medium md:text-base group-hover:text-brand transition line-clamp-2">
            {title}
          </div>
          <p className="text-sm text-muted-foreground">{category}</p>

          <div className="my-3 flex items-center gap-x-2 text-md md:text-sm">
            <div className="flex items-center gap-x-1 text-muted-foreground">
              <IconBadge size={"sm"} icon={BookOpen} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "chapter" : "chapters"}
              </span>
            </div>
          </div>

          {progress !== null ? (
            <div className="">
              <CourseProgress
                value={progress}
                size="sm"
                variant={progress >= 100 ? "success" : "default"}
              />
            </div>
          ) : (
            <p className="text-base md:text-sm font-medium ">
              {formatPrice(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
