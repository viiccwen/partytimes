"use client";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  block_type,
  clicked_user_type,
  joinlist_type,
  position_type,
  useVoteBlockStore,
} from "@/stores/inspect-party-store";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

interface PartyJoinCardProps {
  className?: string;
  Allvotes: block_type[][][];
  joinList: Array<joinlist_type>;
}

export const PartyJoinCard = ({
  className,
  Allvotes,
  joinList,
}: PartyJoinCardProps) => {
  const cur_points_position: position_type = useVoteBlockStore(
    (state) => state.cur_points_position
  );

  const updateClickedUser: (userId: string, creatorName: string) => void =
    useVoteBlockStore((state) => state.updateClickedUser);
  const updateCurPointsUserid: (userid: string) => void = useVoteBlockStore(
    (state) => state.updateCurPointsUserid
  );

  const isEditing: boolean = useVoteBlockStore((state) => state.isEditing);
  const clicked_user: clicked_user_type = useVoteBlockStore(
    (state) => state.clicked_user
  );

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
        ? joinList
        : [...joinList].sort((a, b) => {
            const aInPointList = point_joinList.has(a.userId) ? 1 : 0;
            const bInPointList = point_joinList.has(b.userId) ? 1 : 0;
            return bInPointList - aInPointList;
          }),
    [showAllParticipants, joinList, point_joinList]
  );

  useEffect(() => {
    if (!isEditing && clicked_user.userId === "") {
      setPointJoinList(
        getBlockUsers(
          Allvotes,
          cur_points_position.row,
          cur_points_position.col
        )
      );
    }
  }, [cur_points_position, isEditing, clicked_user, Allvotes]);

  const handleClick = useCallback(
    (join: joinlist_type) => {
      updateClickedUser(
        clicked_user.userId === join.userId ? "" : join.userId,
        join.creatorName
      );
    },
    [clicked_user, updateClickedUser]
  );

  // debug
  // console.log("clicked_user", clicked_user);

  return (
    <Card className={className}>
      <CardContent className="flex flex-col">
        <div className="font-bold text-2xl my-5">
          參與者{" "}
          {showAllParticipants
            ? `(${joinList.length})`
            : `(${point_joinList.size}/${joinList.length})`}
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
  }: ParticipantButtonProps) => (
    <button
      value={join.userId}
      className={cn(
        "h-[35px] text-lg text-start font-bold transition",
        showAllParticipants || point_joinList.has(join.userId)
          ? "dark:text-white text-black"
          : "text-gray-400",
        clicked_user.userId === join.userId
          ? "dark:text-blue-500 text-blue-700"
          : "",
        "dark:hover:text-blue-400 hover:text-blue-600"
      )}
      onClick={() => handleClick(join)}
      onMouseEnter={() => updateCurPointsUserid(join.userId)}
      onMouseLeave={() => updateCurPointsUserid("")}
    >
      {join.creatorName}
    </button>
  )
);

const getBlockUsers = (
  all_voteblocks: block_type[][][],
  row: number,
  col: number
): Set<string> => {
  if (row === -1 || col === -1) return new Set<string>();
  return new Set(all_voteblocks[row][col].map((vote) => vote.userId));
};
