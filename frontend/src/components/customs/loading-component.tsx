import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

interface LoadingComponentProps {
  className?: string;
}

export const LoadingComponent = ({ className }: LoadingComponentProps) => {
  return <Skeleton className={cn(className)} />;
};
