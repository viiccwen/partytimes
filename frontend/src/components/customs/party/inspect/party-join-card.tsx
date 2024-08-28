"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useVoteBlockStore } from "@/stores/inspect-party-store";
import { useEffect, useState } from "react";

type joinlist_type = {
  creatorName: string;
  userId: string;
};

interface PartyJoinCardProps {
  className?: string;
  Allvotes: block_type[][][];
  joinList: Array<joinlist_type>;
}

type block_type = {
  creatorName: string;
  userId: string;
};

type position_type = {
  row: number;
  col: number;
};

export const PartyJoinCard = ({
  className,
  Allvotes,
  joinList,
}: PartyJoinCardProps) => {
  const cur_points_position: position_type = useVoteBlockStore(
    (state) => state.cur_points_position
  );
  const updateClickedUser: (userid: string) => void = useVoteBlockStore(
    (state) => state.updateClickedUser
  );
  const updateCurPointsUserid: (userid: string) => void = useVoteBlockStore(
    (state) => state.updateCurPointsUserid
  );
  const [point_joinList, setPointJoinList] = useState(new Set<string>());

  const sortedJoinList =
    cur_points_position.row === -1 && cur_points_position.col === -1
      ? Array.from(joinList)
      : Array.from(joinList).sort((a, b) => {
          const aInPointList: number = point_joinList.has(a.userId) ? 1 : 0;
          const bInPointList: number = point_joinList.has(b.userId) ? 1 : 0;
          return bInPointList - aInPointList;
        });

  useEffect(() => {
    setPointJoinList(
      getBlockUsers(Allvotes, cur_points_position.row, cur_points_position.col)
    );
  }, [cur_points_position]);

  return (
    <Card className={className}>
      <CardContent className="flex flex-col">
        <div className="font-bold text-2xl my-5">
          參與者{" "}
          {initialCheck(cur_points_position.row, cur_points_position.col)
            ? `(${joinList.length})`
            : `(${point_joinList.size}/${joinList.length})`}
        </div>
        {sortedJoinList.map((join) => (
          <button
            key={join.userId}

            // userid or guest id
            value={join.userId}
            className={`${
              point_joinList.has(join.userId) ||
              initialCheck(cur_points_position.row, cur_points_position.col)
                ? "dark:text-white text-black"
                : "text-gray-400"
            } h-[35px] text-lg text-start dark:hover:text-blue-400 hover:text-blue-600 transition`}

            onClick={() => {
              updateClickedUser(join.userId);
            }}
            onMouseEnter={() => {
              updateCurPointsUserid(join.userId);
            }}
            onMouseLeave={() => {
              updateCurPointsUserid("");
            }}
          >
            {join.creatorName}
          </button>
        ))}
      </CardContent>
    </Card>
  );
};

const getBlockUsers = (
  all_voteblocks: block_type[][][],
  row: number,
  col: number
): Set<string> => {
  if (row === -1 || col === -1) return new Set<string>();
  return new Set(all_voteblocks[row][col].map((vote) => vote.userId));
};

const initialCheck = (row: number, col: number) => {
  return row === -1 && col === -1;
};
