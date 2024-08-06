"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditButton } from "./edit-button";
import { InspectButton } from "./inspect-button";
import { StatusLabel } from "./status-label";

import { party_return_schema_type } from "@/lib/type";

// todo: add types
interface PartyTableProps {
  party: party_return_schema_type[];
}

export const PartyTable = ({ party }: PartyTableProps) => {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Party 🎉</CardTitle>
        <CardDescription>都可以有Party...輸光...</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Table content */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">名稱</TableHead>
              <TableHead>狀態</TableHead>
              <TableHead>時間</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              party.map((content: party_return_schema_type, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{content.title}</TableCell>
                  <TableCell>
                    <StatusLabel status={content.status} />
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-right space-x-2">
                    <EditButton partyid={content.partyid} />
                    <InspectButton partyid={content.partyid} />
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
