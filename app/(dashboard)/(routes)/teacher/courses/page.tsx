import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Props = {};

const CoursesPage = (props: Props) => {
  return (
    <div>
      <Link href={"/teacher/create"}>
        <Button variant={"brand"}>New Course</Button>
      </Link>
    </div>
  );
};

export default CoursesPage;
