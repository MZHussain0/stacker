"use client";

import axios from "axios";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { useToast } from "@/components/ui/use-toast";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

export const CourseEnrollButton = ({
  price,
  courseId,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const onClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/courses/${courseId}/checkout`);

      window.location.assign(response.data.url);
    } catch {
      toast({
        variant: "destructive",
        title: "Something went wrong. Try Again later!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={"brand"}
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      className="w-full md:w-auto">
      Enroll for {formatPrice(price)}
    </Button>
  );
};
