import { CourseWithProgressWithCategory } from "@/actions/GetCourses";
import { Category, Course } from "@prisma/client";
import React from "react";
import CourseCard from "./CourseCard";

interface CourseListProps {
  items: CourseWithProgressWithCategory[];
}
const CoursesList = ({ items }: CourseListProps) => {
  return (
    <div className="">
      <div
        className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4
      ">
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            chaptersLength={item.chapters.length}
            imageUrl={item.imageUrl!}
            price={item.price!}
            progress={item.progress!}
            category={item?.category?.name!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No Courses Found
        </div>
      )}
    </div>
  );
};

export default CoursesList;
