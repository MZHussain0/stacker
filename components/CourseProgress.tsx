import React from "react";
import { Progress } from "./ui/progress";
import { cn } from "@/lib/utils";

type Props = {
  value: number;
  variant?: "default" | "success";
  size?: "default" | "sm";
};

const colorByVariant = {
  default: "text-brand",
  success: "text-emerald-700",
};

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
};
const CourseProgress = ({ value, variant, size }: Props) => {
  return (
    <div className="">
      <Progress className="h-2" value={value} variant={variant} />
      <p
        className={cn(
          "font-medium mt-2 text-brand",
          colorByVariant[variant || "default"],
          sizeByVariant[size || "default"]
        )}>
        {Math.round(value)}% complete
      </p>
    </div>
  );
};

export default CourseProgress;
