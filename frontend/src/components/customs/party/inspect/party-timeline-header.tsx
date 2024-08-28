import { Button } from "@/components/ui/button";
import { clicked_user_type, useVoteBlockStore } from "@/stores/inspect-party-store";
import { CircleCheckBig, CircleX, LucideCalendarCheck2, PenLine, Trash2 } from "lucide-react";

interface PartyTimelineHeaderProps {
  className?: string;
  isEditing: boolean;
  HandleCancelButton: () => void;
  HandleCheckButton: () => void;
  HandleScheduleButton: () => void;
  HandleDeleteButton: () => void;
}

export const PartyTimelineHeader = ({
  className,
  isEditing,
  HandleCheckButton,
  HandleScheduleButton,
  HandleCancelButton,
  HandleDeleteButton
}: PartyTimelineHeaderProps) => {

  const clicked_user: clicked_user_type = useVoteBlockStore((state) => state.clicked_user);

  return (
    <div className={className}>
      {isEditing ? (
        <div className="flex justify-between">
          <p className="text-2xl font-bold">選擇中...</p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="gap-2 text-red-400 hover:text-white hover:bg-red-400"
              onClick={HandleDeleteButton}
            >
              <Trash2 className="w-4 h-4" />
              刪除
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={HandleCancelButton}
            >
              <CircleX className="w-4 h-4" />
              取消
            </Button>
            <Button
              variant="default"
              className="gap-2"
              onClick={HandleCheckButton}
            >
              <CircleCheckBig className="w-4 h-4" />
              確認
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between">
          <p className="text-2xl font-bold">投票</p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="gap-2"
              onClick={HandleScheduleButton}
            >
              <LucideCalendarCheck2 className="w-4 h-4" />
              決定
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={HandleCheckButton}
            >
              <PenLine className="w-4 h-4" />
              {clicked_user.userId ? `為 ${clicked_user.creatorName} 投票` : "投票"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
