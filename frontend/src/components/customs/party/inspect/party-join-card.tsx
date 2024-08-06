import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// add types
interface PartyJoinCardProps {
    className?: string;
    joinList: any;
}

export const PartyJoinCard = ({ className, joinList } : PartyJoinCardProps) => {
  return (
    <Card className={className}>
      <CardContent>
        <div className="font-bold text-2xl mt-5">參與者</div>
      </CardContent>
    </Card>
  );
};
