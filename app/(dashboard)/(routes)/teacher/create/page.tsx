"use client";
import React from "react";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

type Props = {};

const formSchema = z.object({
  title: z.string().min(1, {
    message: "title is required",
  }),
});

const CreateCoursePage = (props: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    // @ts-ignore
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/course", values);
      router.push(`/teacher/courses/${response.data.id}`);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong. Try Again later!",
      });
    }
    console.log(values);
  };
  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Name your course</h1>
        <p className=" text-sm text-muted-foreground">
          What would you like to name your course? Don&apos;t worry you can
          change this later.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8 mt-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder=" eg: 'Mastery React Course 2024'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public course name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Link href={"/"}>
                <Button type="button">Cancel</Button>
              </Link>
              <Button
                variant={"brand"}
                type="submit"
                disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateCoursePage;
