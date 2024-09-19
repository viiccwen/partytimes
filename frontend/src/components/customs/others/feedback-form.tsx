"use client";
import { SendFeedbackMail } from "@/actions/mail-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { feedback_schema } from "@/lib/schema";
import { feedback_schema_type } from "@/lib/type";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
export const FeedbackForm = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<feedback_schema_type>({
    resolver: zodResolver(feedback_schema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formdata: feedback_schema_type) => {
    setIsLoading(true);
    const response = await SendFeedbackMail(formdata);

    if (response.correct) {
      toast.success("感謝您的回饋！");
      reset();
      setIsLoading(false);
    } else {
      toast.error(response.error);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className={cn("md:w-[500px] min-h-[500px] p-5")}>
          <CardContent>
            <div className={cn("text-2xl", "md:text-3xl font-bold text-center")}>意見回饋</div>
            <div className={cn("text-sm", "md:text-lg mt-5 text-center")}>
              歡迎提供意見回饋，讓我們做得更好！
            </div>
            <div className="mt-5 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <p className="ml-2"></p>
                <Input placeholder="name" {...register("name")} />
              </div>
              <div className="flex items-center gap-3">
                <p className=" text-red-400">*</p>
                <Input placeholder="email" {...register("email")} />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm ml-5">
                  {errors.email.message}
                </p>
              )}
              <div className="flex items-center gap-3">
                <p className=" text-red-400">*</p>
                <Controller
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="請選擇意見" ref={field.ref} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="feedback">建議</SelectItem>
                        <SelectItem value="great">稱讚</SelectItem>
                        <SelectItem value="bug">Bug</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.type && (
                  <p className="text-red-500 text-sm ml-5">
                    {errors.type.message}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <p className=" text-red-400">*</p>
                <Input placeholder="title" {...register("title")} />
              </div>
              {errors.title && (
                <p className="text-red-500 text-sm ml-5">
                  {errors.title.message}
                </p>
              )}
              <div className="flex items-center gap-3">
                <p className=" text-red-400">*</p>
                <Textarea
                  placeholder="content"
                  className="h-[100px]"
                  {...register("content")}
                />
              </div>
              {errors.content && (
                <p className="text-red-500 text-sm ml-5">
                  {errors.content.message}
                </p>
              )}
              <Button type="submit" className="mt-3" disabled={isLoading}>
                {isLoading ? "送出中..." : "送出"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};
