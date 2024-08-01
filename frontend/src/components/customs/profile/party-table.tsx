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
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Edit2, Eye } from "lucide-react";
import { EditButton } from "./edit-button";
import { InspectButton } from "./inspect-button";
import { StatusLabel } from "./status-label";

export const PartyTable = () => {
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
            <TableRow>
              <TableCell className="font-medium">第一次會議</TableCell>
              <TableCell><StatusLabel status="已計畫" /></TableCell>
              <TableCell>2024/07/21 12:00-14:00</TableCell>
              <TableCell className="text-right space-x-2">
                <EditButton />
                <InspectButton />
              </TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell className="font-medium">第二次會議</TableCell>
              <TableCell><StatusLabel status="未計畫" /></TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right space-x-2">
                <EditButton />
                <InspectButton />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
