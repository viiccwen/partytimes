'use client';
import { Button } from "@/components/ui/button";
import { useVoteBlockStore } from "@/stores/inspect-party-store";
import {
  CircleCheckBig,
  CircleX,
  LucideCalendarCheck2,
  PenLine,
  Trash2,
} from "lucide-react";

interface PartyTimelineHeaderProps {
  className?: string;
  isEditing: boolean;
  isScheduling: boolean;
  isClicked: boolean;
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
  isClicked,
  has_scheduled,
  HandleCheckButton,
  HandleScheduleButton,
  HandleCancelButton,
  HandleDeleteButton,
}: PartyTimelineHeaderProps) => {
  const { isBounced, clicked_user } = useVoteBlockStore();

  return (
    <div className={className}>
      {isEditing ? (
        <div className="flex justify-between items-center">
          <p className="text-base md:text-2xl font-bold">選擇中...</p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="gap-2 text-red-400 hover:text-white hover:bg-red-400"
              onClick={HandleDeleteButton}
            >
              <Trash2 className="w-4 h-4" />
              <p className="hidden md:block">刪除</p>
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={HandleCancelButton}
            >
              <CircleX className="w-4 h-4" />
              <p className="hidden md:block">取消</p>
            </Button>
            <Button
              variant="default"
              className="gap-2 bg-blue-500 hover:bg-blue-700 text-white "
              onClick={HandleCheckButton}
              disabled={isClicked}
            >
              <CircleCheckBig className="w-4 h-4 " />
              <p className="hidden md:block">{isClicked ? "確認中..." : "確認"}</p>
            </Button>
          </div>
        </div>
      ) : isScheduling ? (
        <div className="flex justify-between items-center">
          <p className="text-base md:text-2xl font-bold">決定日期...</p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="gap-2"
              onClick={HandleCancelButton}
            >
              <CircleX className="w-4 h-4" />
              <p className="hidden md:block">取消</p>
            </Button>
            <Button
              variant="default"
              className="gap-2 bg-blue-500 hover:bg-blue-700 text-white"
              onClick={HandleScheduleButton}
              disabled={isClicked}
            >
              <CircleCheckBig className="w-4 h-4" />
              <p className="hidden md:block">{isClicked ? "確認中..." : "確認"}</p>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <p className="text-base md:text-2xl font-bold">投票</p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="gap-2"
              onClick={HandleScheduleButton}
            >
              <LucideCalendarCheck2 className="w-4 h-4" />
              {has_scheduled ? "重新登記" : "登記"}
            </Button>
            <Button
              variant="outline"
              className={`bg-blue-500 hover:bg-blue-700 text-white gap-2 hover:text-white ${
                !isEditing && isBounced
                  ? "transition scale-110 duration-300 ease-in-out"
                  : "transition scale-100 duration-300 ease-in-out"
              }`}
              onClick={HandleCheckButton}
            >
              <PenLine className="w-4 h-4" />
              {clicked_user.userId
                ? `為 ${clicked_user.creatorName} 投票`
                : "投票"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
