"use client";
import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  FileCheckIcon,
  ImageIcon,
  Loader2,
  PencilIcon,
  Plus,
  X,
} from "lucide-react";
import Image from "next/image";
import { Attachment, Course } from "@prisma/client";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";

type Props = {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
};

const formSchema = z.object({
  url: z.string().min(1),
});

const AttachmentForm = ({ initialData, courseId }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<String | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        `/api/courses/${courseId}/attachments`,
        values
      );
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

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast({
        variant: "default",
        title: "Attachement Deleted!",
      });
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Could not delete. Try Again later!",
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 border bg-muted rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Attachments
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <Plus className="h-4 w-4 mr-2 text-brand" />
              Add a file
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 italic text-muted-foreground">
              No attachments yet
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-brand border-yellow-300 boder text-secondary rounded-lg">
                  <FileCheckIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-sm line-clamp-1">{attachment.name}</p>
                  {deletingId === attachment.id && (
                    <div>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button
                      onClick={() => handleDelete(attachment.id)}
                      className="ml-auto hover:opacity-75 transition">
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {isEditing && (
        <div className="">
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                handleSubmit({ url });
              }
            }}
          />
          <div className="text-xs  text-muted-foreground mt-4">
            Add anything your students might need to complete your course
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
