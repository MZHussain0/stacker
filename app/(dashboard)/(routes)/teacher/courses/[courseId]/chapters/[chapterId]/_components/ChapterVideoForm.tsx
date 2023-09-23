"use client";
import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ImageIcon, PencilIcon, Plus, VideoIcon } from "lucide-react";
import { Chapter, MuxData } from "@prisma/client";
import MuxPlayer from "@mux/mux-player-react";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";

type Props = {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
};

const formSchema = z.object({
  videoUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

const ChapterVideoForm = ({ initialData, courseId, chapterId }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toggleEdit();
      router.refresh();
      toast({
        variant: "default",
        title: "Video Updated!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong. Try Again later!",
      });
    }
  };

  return (
    <div className="mt-6 border bg-muted rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter Video
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData?.videoUrl && (
            <>
              <Plus className="h-4 w-4 mr-2 text-brand" />
              Add a Video
            </>
          )}
          {!isEditing && initialData?.videoUrl && (
            <>
              <PencilIcon className="h-4 w-4 mr-2 text-brand" />
              Edit Video
            </>
          )}
        </Button>
      </div>

      {!isEditing &&
        (!initialData?.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-primary-foreground rounded-md">
            <VideoIcon className="h-10 w-10" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
          </div>
        ))}

      {isEditing && (
        <div className="">
          <FileUpload
            endpoint="chapterVideos"
            onChange={(url) => {
              if (url) {
                handleSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs  text-muted-foreground mt-4">
            Upload video
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-sm text-muted-foreground mt-2">
          Videos can take a few minutes to upload. Refresh the page if video
          does not appear
        </div>
      )}
    </div>
  );
};

export default ChapterVideoForm;
