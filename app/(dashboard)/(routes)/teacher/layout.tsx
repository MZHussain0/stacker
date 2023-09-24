import { isTeacher } from "@/actions/teacher";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  const { userId } = auth();
  if (!isTeacher(userId)) return redirect("/");
  return <>{children}</>;
};

export default layout;
