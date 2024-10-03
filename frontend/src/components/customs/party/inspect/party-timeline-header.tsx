"use client";
import { Button } from "@/components/ui/button";
import { useVoteBlockStore } from "@/stores/inspect-party-store";
import {
  CircleCheckBig,
  CircleX,
  LucideCalendarCheck2,
  PenLine,
  Trash2,
} from "lucide-react";
import { useCallback } from "react";

interface PartyTimelineHeaderProps {
  className?: string;
  isEditing: boolean;
  isScheduling: boolean;
  has_scheduled: boolean;
  HandleCancelButton: () => void;
  HandleCheckButton: () => void;
  HandleScheduleButton: () => void;
  HandleDeleteButton: () => void;
}

export const PartyTimelineHeader = ({
  className,
  isEditing,
  isScheduling,
  has_scheduled,
  HandleCheckButton,
  HandleScheduleButton,
  HandleCancelButton,
  HandleDeleteButton,
}: PartyTimelineHeaderProps) => {
  const {
    isBounced,
    clicked_user,
    isConfirmClicked,
    isDeleteClicked,
    isScheduledClicked,
  } = useVoteBlockStore();

  const renderButton = (
    (
      variant:
        | "link"
        | "default"
        | "destructive"
        | "outline"
        | "secondary"
        | "ghost"
        | null
        | undefined,
      onClick: () => void,
      icon: JSX.Element,
      text: string,
      isLoading: boolean = false,
      additionalClasses: string = "",
      disabled: boolean = false
    ) => (
      <Button
        variant={variant}
        onClick={onClick}
        className={`gap-2 ${additionalClasses}`}
        disabled={disabled}
      >
        {icon}
        <p className="hidden md:block">{isLoading ? `${text}中...` : text}</p>
      </Button>
    )
  );

  const headerContent = () => {
    if (isEditing) {
      return (
        <div className="flex justify-between items-center">
          <p className="text-base md:text-2xl font-bold">選擇中...</p>
          <div className="flex gap-2">
            {renderButton(
              "outline",
              HandleDeleteButton,
              <Trash2 className="w-4 h-4" />,
              "刪除",
              isDeleteClicked,
              "text-red-400 hover:text-white hover:bg-red-400",
              isConfirmClicked || isDeleteClicked
            )}
            {renderButton(
              "outline",
              HandleCancelButton,
              <CircleX className="w-4 h-4" />,
              "取消"
            )}
            {renderButton(
              "default",
              HandleCheckButton,
              <CircleCheckBig className="w-4 h-4" />,
              "確認",
              isConfirmClicked,
              "bg-blue-500 hover:bg-blue-700 text-white",
              isConfirmClicked || isDeleteClicked
            )}
          </div>
        </div>
      );
    }

    if (isScheduling) {
      return (
        <div className="flex justify-between items-center">
          <p className="text-base md:text-2xl font-bold">決定日期...</p>
          <div className="flex gap-2">
            {renderButton(
              "outline",
              HandleCancelButton,
              <CircleX className="w-4 h-4" />,
              "取消"
            )}
            {renderButton(
              "default",
              HandleScheduleButton,
              <CircleCheckBig className="w-4 h-4" />,
              "確認",
              isConfirmClicked || isScheduledClicked,
              "bg-blue-500 hover:bg-blue-700 text-white",
              isConfirmClicked || isDeleteClicked || isScheduledClicked
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="flex justify-between items-center">
        <p className="text-base md:text-2xl font-bold">投票</p>
        <div className="flex gap-2">
          {renderButton(
            "outline",
            HandleScheduleButton,
            <LucideCalendarCheck2 className="w-4 h-4" />,
            has_scheduled ? "重新登記" : "登記"
          )}
          {renderButton(
            "outline",
            HandleCheckButton,
            <PenLine className="w-4 h-4" />,
            clicked_user.userId
              ? `為 ${clicked_user.creatorName} 投票`
              : "投票",
            false,
            `bg-blue-500 hover:bg-blue-700 text-white hover:text-white ${
              !isEditing && isBounced
                ? "transition scale-110 duration-300 ease-in-out"
                : "transition scale-100 duration-300 ease-in-out"
            }`
          )}
        </div>
      </div>
    );
  };

  return <div className={className}>{headerContent()}</div>;
};
