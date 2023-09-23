"use client";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useConfettiStore } from "@/hooks/useConfettiStore";
import axios from "axios";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {
  courseId: string;
  disabled: boolean;
  isPublished: boolean;
};

const CourseActions = ({ courseId, disabled, isPublished }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const confetti = useConfettiStore();
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}`);
      toast({
        variant: "default",
        title: "Course deleted!",
      });
      router.refresh();
      router.push(`/teacher/courses/`);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong. Try Again later!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast({
          variant: "default",
          title: "Course unpublished!",
        });
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast({
          variant: "default",
          title: "Course published!",
        });
        confetti.onOpen();
      }
      router.refresh();
      // router.push(`/teacher/courses/${courseId}`);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong. Try Again later!",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center gap-x-2">
      <Button
        variant={"brand"}
        size={"sm"}
        disabled={disabled || isLoading}
        onClick={handlePublish}>
        {" "}
        {isPublished ? "Unpublish" : "Publish"}
      </Button>

      <ConfirmModal onConfirm={onDelete}>
        <Button variant={"destructive"} size={"sm"} disabled={isLoading}>
          <TrashIcon className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default CourseActions;
