"use client";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  block_type,
  clicked_user_type,
  joinlist_type,
  useVoteBlockStore,
} from "@/stores/inspect-party-store";
import { useTimelineUserStore } from "@/stores/timeline-user-store";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

interface PartyJoinCardProps {
  className?: string;
}

export const PartyJoinCard = ({ className }: PartyJoinCardProps) => {
  const { join_lists } = useTimelineUserStore();
  const {
    vote_blocks,
    cur_points_position,
    clicked_user,
    isEditing,
    updateClickedUser,
    updateCurPointsUserid,
  } = useVoteBlockStore();
  const [point_joinList, setPointJoinList] = useState(new Set<string>());

  const showAllParticipants = useMemo(
    () =>
      isEditing ||
      (cur_points_position.row === -1 && cur_points_position.col === -1) ||
      clicked_user.userId !== "",
    [isEditing, cur_points_position, clicked_user]
  );

  const sortedJoinList = useMemo(
    () =>
      showAllParticipants
        ? join_lists
        : [...join_lists].sort((a, b) => {
            const aInPointList = point_joinList.has(a.userId) ? 1 : 0;
            const bInPointList = point_joinList.has(b.userId) ? 1 : 0;
            return bInPointList - aInPointList;
          }),
    [showAllParticipants, join_lists, point_joinList]
  );

  useEffect(() => {
    if (!isEditing && clicked_user.userId === "") {
      setPointJoinList(
        getBlockUsers(
          vote_blocks,
          cur_points_position.row,
          cur_points_position.col
        )
      );
    }
  }, [cur_points_position, isEditing, clicked_user, vote_blocks]);

  const handleClick = (join: joinlist_type) => {
    updateClickedUser(
      clicked_user.userId === join.userId ? "" : join.userId,
      join.creatorName
    );
  };

  if (!vote_blocks || vote_blocks.length === 0) return null;

  return (
    <Card className={className}>
      <CardContent className="flex flex-col">
        <div className="font-bold text-2xl my-5">
          參與者{" "}
          {showAllParticipants
            ? `(${join_lists.length})`
            : `(${point_joinList.size}/${join_lists.length})`}
        </div>
        {sortedJoinList.map((join) => (
          <ParticipantButton
            key={join.userId}
            join={join}
            showAllParticipants={showAllParticipants}
            point_joinList={point_joinList}
            clicked_user={clicked_user}
            handleClick={handleClick}
            updateCurPointsUserid={updateCurPointsUserid}
          />
        ))}
      </CardContent>
    </Card>
  );
};

interface ParticipantButtonProps {
  join: joinlist_type;
  showAllParticipants: boolean;
  point_joinList: Set<string>;
  clicked_user: clicked_user_type;
  handleClick: (join: joinlist_type) => void;
  updateCurPointsUserid: (userid: string) => void;
}

const ParticipantButton = memo(
  ({
    join,
    showAllParticipants,
    point_joinList,
    clicked_user,
    handleClick,
    updateCurPointsUserid,
  }: ParticipantButtonProps) => {
    return (
      <button
        value={join.userId}
        className={cn(
          "h-[35px] text-lg text-start transition",
          showAllParticipants || point_joinList.has(join.userId)
            ? "dark:text-white text-black"
            : "text-gray-400",
          clicked_user.userId === join.userId
            ? "dark:text-blue-500 text-blue-700"
            : "",
          "dark:hover:text-blue-400 hover:text-blue-600 text-sm md:text-lg"
        )}
        onClick={() => handleClick(join)}
        onMouseEnter={() => updateCurPointsUserid(join.userId)}
        onMouseLeave={() => updateCurPointsUserid("")}
      >
        {join.creatorName}
      </button>
    );
  }
);

const getBlockUsers = (
  all_voteblocks: block_type[][][],
  row: number,
  col: number
): Set<string> => {
  if (row === -1 || col === -1) return new Set<string>();
  return new Set(all_voteblocks[row][col].map((vote) => vote.userId));
};

ParticipantButton.displayName = "ParticipantButton";
