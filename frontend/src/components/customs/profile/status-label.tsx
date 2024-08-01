interface StatusLabelProps {
  status: string;
}

const status_color = new Map<string, string>([
  ["已計畫", "bg-green-500"],
  ["未計畫", "bg-red-500"],
]);

export const StatusLabel = ({ status }: StatusLabelProps) => {
  return (
    <div className="flex items-center space-x-2">
      <div className={`w-2 h-2 rounded-full ${status_color.get(status)}`}></div>
      <p>{status}</p>
    </div>
  );
};
