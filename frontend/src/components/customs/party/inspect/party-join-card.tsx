"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useVoteBlockStore } from "./inspect-party-container";
import { useEffect, useState } from "react";

interface PartyJoinCardProps {
  className?: string;
  Allvotes: Array<block_type[]>[];
  joinList: Set<string>;
}

type block_type = {
  creatorName: string;
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
  const [point_joinList, setPointJoinList] = useState(new Set<string>());

  const sortedJoinList =
    cur_points_position.row === -1 && cur_points_position.col === -1
      ? Array.from(joinList)
      : Array.from(joinList).sort((a, b) => {
          const aInPointList: number = point_joinList.has(a) ? 1 : 0;
          const bInPointList: number = point_joinList.has(b) ? 1 : 0;
          return bInPointList - aInPointList;
        });

  useEffect(() => {
    setPointJoinList(
      getBlockUsers(Allvotes, cur_points_position.row, cur_points_position.col)
    );
  }, [cur_points_position]);

  return (
    <Card className={className}>
      <CardContent>
        <div className="font-bold text-2xl my-5">
        參與者 {initialCheck(cur_points_position.row, cur_points_position.col) ? `(${joinList.size})` : `(${point_joinList.size}/${joinList.size})`}
        </div>
        {sortedJoinList.map((join) => (
          <div
            key={join}
            className={`${
              point_joinList.has(join) ||
              initialCheck(cur_points_position.row, cur_points_position.col)
                ? "text-black"
                : "text-gray-400"
            } text-lg my-4`}
          >
            {join}
          </div>
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
  return new Set(all_voteblocks[row][col].map((vote) => vote.creatorName));
};

const initialCheck = (row: number, col: number) => {
  return row === -1 && col === -1;
}