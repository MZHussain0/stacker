"use client";
import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ImageIcon, PencilIcon, Plus } from "lucide-react";
import Image from "next/image";
import { Course } from "@prisma/client";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";

type Props = {
  initialData: Course;
  courseId: string;
};

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

const ImageForm = ({ initialData, courseId }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/courses/${courseId}`, values);
      toggleEdit();
      router.refresh();
      toast({
        variant: "default",
        title: "Image Updated!",
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
        Course Image
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData?.imageUrl && (
            <>
              <Plus className="h-4 w-4 mr-2 text-brand" />
              Add Cover Photo
            </>
          )}
          {!isEditing && initialData?.imageUrl && (
            <>
              <PencilIcon className="h-4 w-4 mr-2 text-brand" />
              Edit image
            </>
          )}
        </Button>
      </div>

      {!isEditing &&
        (!initialData?.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-primary-foreground rounded-md">
            <ImageIcon className="h-10 w-10" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="upload Image"
              fill
              className="object-cover rounded-md"
              src={initialData.imageUrl}
            />
          </div>
        ))}

      {isEditing && (
        <div className="">
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                handleSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs  text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageForm;
